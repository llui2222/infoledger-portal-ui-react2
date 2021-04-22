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
import {handleNext, reset as resetForm } from "../../redux/actions/stepForm";
import {useLocation} from "react-router-dom";
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
    const [open, setOpen] = useState(true);
    const firstRender = useRef(true);

    const allSteps = useSelector(state => state.stepForm.allSteps);
    const step = useSelector(state => state.stepForm.step);
    const companies = useSelector(state => state.companies.companies);

    const [addCompany, { error, data }] = useMutation(gql(saveProfile));

    const haveSteps = allSteps.length > 1;
    const haveMoreSteps = allSteps.length > step+1;
    const haveNoCompany = companies.length === 0;

    const {
        register,
        errors,
        getValues,
        control,
        trigger,
        reset,
        setValue
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            companyName: '',
            companyType: '',
            typeOfBusiness: '',
            country: countries[0],
            address: '',
            postalCode: '',
        }
    });

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

            dispatch(companyCreate);

            const formValues = getValues();

            const newProfile = { variables: {
                    profile: {
                        profileName: formValues.companyName,
                        profileType: formValues.companyType,
                        typeOfBusiness: formValues.typeOfBusiness,
                        billingAddress: {
                            country:  formValues.country.name,
                        }
                    }
                }
            };

            addCompany(newProfile).then(companyCreated => {
                if(companyCreated.data && companyCreated.data.saveProfile && companyCreated.data.saveProfile.profileId) {
                    window.location = '/company/' + companyCreated.data.saveProfile.profileId;
                }
            }).catch(error => {
                console.log(error);
            })
        }
    },[step]);

    const handleCancel = () => {
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
                        {allSteps.map(stepName =>
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
                    { haveNoCompany ?
                        <BaseCompanyFields
                            control={control}
                            errors={errors}
                            register={register}
                            trigger={trigger}
                            setValue={setValue}
                        />
                        :
                        <ChildCompanyFields control={control} errors={errors} register={register} trigger={trigger} setValue={setValue}/>
                    }

                </FormControl>

            </DialogContent>

            <DialogActions>

                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>

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
