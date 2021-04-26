import React, {useEffect, useState, useRef} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stepper,
    Step,
    StepLabel, FormControl
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {handleNext, reset as resetForm, setAllSteps, nextStep} from "../../redux/actions/stepForm";
import {useHistory, useLocation} from "react-router-dom";
import BaseCompanyFields from "./BaseCompanyFields";
import ChildCompanyFields from "./ChildCompanyFields";
import {gql, useMutation} from "@apollo/client";
import {saveProfile} from "../../graphql/mutations";
import {useForm} from "react-hook-form";
import countries from "../../data/countries";
import {companyCreate, companyCreateFailure, companyCreateSuccess} from "../../redux/actions/company";
import {showNotification} from "../../redux/actions/notifications";

const useStyles = makeStyles((theme) => ({
    popupContent: {
        padding: `${theme.spacing(2)}px ${theme.spacing(6)}px`,
    },
    stepper: {
        marginTop: theme.spacing(2)
    },
    dialog: {
        '& .MuiDialog-container .MuiPaper-root': {
            overflow: 'visible'
        }
    },
    dialogTitle: {
        position: 'absolute',
        top: -58,
        paddingLeft: 2,
        color: 'white'
    },
    form: {
        width: 400,
        margin: 'auto',
        textAlign: 'left'
    },
}));

function CompanyCreatePopup() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [open, setOpen] = useState(true);
    const firstRender = useRef(true);
    const [showCurrency, setShowCurrency] = useState(false);

    const allSteps = useSelector(state => state.stepForm.allSteps);
    const step = useSelector(state => state.stepForm.step);
    const next = useSelector(state => state.stepForm.next);
    const rootCompany = useSelector(state => state.companies.rootCompany);
    const refetch = useSelector(state => state.companies.refetch);

    const [addCompany, { error, data }] = useMutation(gql(saveProfile));

    const haveSteps = allSteps.length > 1;
    const haveMoreSteps = allSteps.length > step+1;
    const defaultCurrency = {code: '',name: ''};

    const {
        register,
        errors,
        getValues,
        control,
        trigger,
        reset
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            companyName: '',
            accountType: '',
            companyType: '',
            typeOfBusiness: '',
            baseCurrency: defaultCurrency,
            country: countries[0],
            address: '',
            postalCode: '',
        }
    });

    useEffect(() => {
        if(!rootCompany) {
            dispatch(setAllSteps(['Company']));
        } else {
            dispatch(setAllSteps(['Company', 'Business Address']));
        }
    }, [!rootCompany])

    React.useEffect(() => {
        if(location.pathname.includes('/create-company') ) {
            setOpen(true);
        }
    }, [location])

    useEffect(() => {
        if(error) {
            dispatch(companyCreateFailure(error));
        }
    },[error]);

    useEffect(() => {
        if(data) {
            dispatch(companyCreateSuccess);

            dispatch(showNotification({
                message: 'Company created',
                options: {
                    key: 'company-updated',
                    variant: 'success'
                },
            }));

            handleCancel();
        }
    },[data]);

    useEffect(() => {

        if(firstRender.current) {
            firstRender.current = false;
            return;
        }

        if( step >= allSteps.length && allSteps.length !== 0 ) {

            setOpen(false);

            dispatch(companyCreate);

            const formValues = getValues();

            const newProfile = { variables: {
                    profile: {
                        profileName: formValues.companyName
                    }
                }
            };

            if(showCurrency) {
                newProfile.variables.profile.currency = formValues.baseCurrency.code
            }

            if(rootCompany) {
                newProfile.variables.profile.parentProfileId = rootCompany.profileId;
                newProfile.variables.profile.profileType = 'COMPANY';
                newProfile.variables.profile.businessAddress = {
                    country: formValues.country.name,
                    streetAddress: formValues.street1 + ' ' + formValues.street2,
                    city: formValues.city,
                    postalCode: formValues.postalCode,
                    phoneNumber: formValues.phone,
                };
            } else {

                newProfile.variables.profile.billingAddress = {
                    country:  formValues.country.name,
                }

                switch (formValues.accountType) {
                    case 'ORGANIZATION':
                        newProfile.variables.profile.profileType = 'ORGANIZATION';
                        newProfile.variables.profile.typeOfBusiness = 'ASSET_OWNER';
                        break;
                    case 'INDIVIDUAL_INVESTOR':
                        newProfile.variables.profile.profileType = 'INDIVIDUAL_INVESTOR';
                        newProfile.variables.profile.typeOfBusiness = 'ASSET_OWNER';
                        break;
                    case 'SERVICE_COMPANY':
                        newProfile.variables.profile.profileType = 'ORGANIZATION';
                        newProfile.variables.profile.typeOfBusiness = 'SERVICE_COMPANY';
                        break;
                }
            }

            addCompany(newProfile).then(companyCreated => {

                clearForm();

                if(!rootCompany) {
                    refetch().then(() => {
                        history.push(`/company/${companyCreated.data.saveProfile.profileId}/settings`);
                    });
                } else {
                    history.push(`/company/${rootCompany.profileId}/settings`);
                    refetch();
                }
            }).catch(error => {
                console.log(error);
            })
        }
    },[step]);



    useEffect(() => {

        const step1Fields = [
            "companyName",
            "country",
        ];

        if(showCurrency) {
            step1Fields.push("baseCurrency");
        }

        if(!rootCompany) {
            step1Fields.push("accountType");
        }

        const step2Fields = [
            "street1",
            "city",
            "postalCode",
            "phone",
        ];

        if(next > 0 && step === 0) {
            trigger(step1Fields).then(valid => {
                if(valid) {
                    dispatch(nextStep());
                }
            })
        }

        if(next > 0 && step === 1) {
            trigger(step2Fields).then(valid => {
                if(valid) {
                    dispatch(nextStep());
                }
            })
        }
    }, [next]);

    const handleCancel = () => {

        if(!rootCompany) {
            return;
        }
        clearForm();
    }

    const clearForm = () => {
        setOpen(false);
        reset();
        dispatch(resetForm());
    }

    const handleNextClick = () => {
        dispatch(handleNext());
    }

    return (
        <Dialog onClose={handleCancel} open={open} className={classes.dialog}>

            <DialogTitle onClose={handleCancel} className={classes.dialogTitle}>
                Add a Company
            </DialogTitle>

            <DialogContent dividers className={classes.popupContent}>

                { haveSteps ?
                    <Stepper alternativeLabel activeStep={step} className={classes.stepper}>
                        {allSteps.map((stepName) =>
                            <Step key={stepName}>
                                <StepLabel>{stepName}</StepLabel>
                            </Step>
                        )}
                    </Stepper> : null
                }

                <FormControl
                    component="form"
                    className={classes.form}
                >
                    { !rootCompany ?
                        <BaseCompanyFields
                            control={control}
                            errors={errors}
                            register={register}
                            showCurrency={showCurrency}
                            setShowCurrency={setShowCurrency}
                        />
                        :
                        <ChildCompanyFields
                            control={control}
                            errors={errors}
                            register={register}
                            showCurrency={showCurrency}
                            setShowCurrency={setShowCurrency}
                        />
                    }

                </FormControl>

            </DialogContent>

            <DialogActions>

                { !rootCompany &&
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                }

                { haveMoreSteps ?
                    <Button onClick={handleNextClick} variant="contained" color="primary">
                        Next
                    </Button>
                    :
                    <Button onClick={handleNextClick} variant="contained" color="primary">
                        Add
                    </Button>
                }

            </DialogActions>
        </Dialog>
    );
}

export default CompanyCreatePopup;
