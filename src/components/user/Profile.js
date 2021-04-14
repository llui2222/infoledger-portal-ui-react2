import React, {useEffect, useRef, useState} from "react";
import {
    Box,
    Button,
    FormControl, TextField,
} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {useForm} from "react-hook-form";
import EmailConfirmedMessage from "../common/EmailConfirmedMessage";
import {
    currentAuthenticatedUser, currentUserInfo
} from "../../redux/api/auth";
import PageContainer from "../common/containers/PageContainer";
import PageHeader from "../common/PageHeader";
import {changePassword, confirmChangedEmail, updateUserAttributes} from "../../redux/actions/user";
import {cleanProperty} from "../../utils/cleanProperty";
import Typography from "@material-ui/core/Typography";
import Modal from "../shared/modal/Modal";

const useStyles = makeStyles((theme) => ({
    defaultForm: {
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'column',
        '& > *:not(:last-child)':{
          marginBottom: 15
        }
    },
    form: {
        margin: 'auto',
        width: '100%'
    },
    submitButton: {
        margin: `${theme.spacing(1)}px 0 0 auto`
    },
    paper: {
        top: '50%',
        left: '50%',
        position: 'fixed',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '15px'
    },
    codeInput: {
        marginTop: 0,
        marginRight: 15
    },
    modalActive: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

const initialProfile = {
    firstName: '',
    lastName: '',
    login: '',
    password: '**********',
}

function Profile() {

    const [activeField, setActiveField] = useState('confirmEmail')
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(true)
    const [profile, setProfile] = useState(initialProfile)
    const dispatch = useDispatch();
    const classes = useStyles();
    const ref = useRef(null);

    const {
        register,
        handleSubmit,
        errors,
        setValue,
        getValues,
        formState: {
            isDirty,
            isValid
        }
    } = useForm({
        mode: 'onBlur'
    });

    useEffect(() => {
        currentAuthenticatedUser().then(user => {
            console.log(`==========>user`, user)
            // if (user.attributes) {
            //     user.attributes.name && setValue('name', user.attributes.name, {shouldValidate: true});
            //     user.attributes.family_name && setValue('family_name', user.attributes.family_name, {shouldValidate: true});
            //     user.attributes.address && setValue('address', user.attributes.address, {shouldValidate: true});
            //     user.attributes.email && user.attributes.email_verified && setValue('email', user.attributes.email, {shouldValidate: true});
            // }
        })
    }, [])


    const onSubmit = data => {
        const {name, family_name, address, email, oldPass, newPass} = data
        const formattedValues = cleanProperty(
            {
                name,
                family_name,
                address,
                email
            })
        if (Object.keys(formattedValues).length) {
            dispatch(updateUserAttributes({
                    info: cleanProperty(
                        {
                            name,
                            family_name,
                            address,
                            email
                        }
                    ),
                    confirmationCallback: (name) => {
                        setIsConfirmModalOpen(true)
                    }
                }
            ));
        }
        if (oldPass && newPass) {
            dispatch(changePassword({oldPass, newPass}));
        }
    }

    const handleConfirm = () => {
        dispatch(confirmChangedEmail({
            attr: 'email',
            code: ref.current.value
        }));
        setIsConfirmModalOpen(false)
    }

    const getForm = (formName) => {
        switch (formName) {
            case 'confirmEmail' :
                return (
                    <Box className={classes.modalActive}>
                        <TextField
                            className={classes.codeInput}
                            inputRef={ref}
                            id="standard-basic"
                            label="code"
                            inputProps={{
                                name: "address",
                                ref: register({
                                    validate: {
                                        pattern: v => /^[A-Za-z]+$/i.test(v) || 'Incorrect entry.'
                                    }
                                })
                            }}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                        {/*<Button*/}
                        {/*    variant="contained"*/}
                        {/*    color="primary"*/}
                        {/*    onClick={handleConfirm}*/}
                        {/*    disabled={!isDirty || !isValid}*/}
                        {/*>*/}
                        {/*    send*/}
                        {/*</Button>*/}
                    </Box>
                )
            default:
                return null
        }
    }

    return (
        <>
            <PageContainer>
                <PageHeader title="Profile" isSearch={false}/>
                <Box className={classes.defaultForm}>
                    <TextField
                        disabled
                        label="First Name"
                        autoComplete="first-name"
                        value={profile.firstName}
                        type="text"
                    />
                    <TextField
                        label="Last Name"
                        autoComplete="last-name"
                        type="text"
                        value={profile.lastName}
                    />
                    <TextField
                        label="Login"
                        autoComplete="email"
                        type="email"
                    />
                    <TextField
                        label="Password"
                        autoComplete="current-password"
                        type="password"
                        value={profile.password}
                    />
                </Box>

                <EmailConfirmedMessage/>
            </PageContainer>
            <Modal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                title="some"
            >
                <FormControl
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className={classes.form}
                >
                    {getForm(activeField)}
                    <Button
                        className={classes.submitButton}
                        variant="contained"
                        size="large"
                        color="primary"
                        disableElevation
                        type="submit"
                        name="save"
                        disabled={!isDirty || !isValid}
                    >
                        Save
                    </Button>
                </FormControl>
            </Modal>
        </>
    );
}

export default Profile;
