import React, {useEffect, useState} from "react";
import {
    Box,
    Button, Divider,
    FormControl, InputAdornment, TextField,
} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {useForm} from "react-hook-form";
import { useHistory} from "react-router-dom";
import EmailConfirmedMessage from "../common/EmailConfirmedMessage";
import {
    currentAuthenticatedUser
} from "../../redux/api/auth";
import PageContainer from "../common/containers/PageContainer";
import PageHeader from "../common/PageHeader";
import {changePassword, confirmChangedEmail, updateUserAttributes} from "../../redux/actions/user";
import {cleanProperty} from "../../utils/cleanProperty";
import Modal from "../shared/modal/Modal";
import FieldPassword from "../common/FieldPassword";

const useStyles = makeStyles((theme) => ({
    defaultForm: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        '& > *:not(:last-child)': {
            marginBottom: 15
        }
    },
    form: {
        margin: 'auto',
        width: '100%',
        minWidth: '40vw'
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
        marginRight: 15,
    },
    modalActive: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnGroup: {
        display: 'flex',
        margin: 'auto',
    },
    editButton: {
        padding: 0,
    },

    divider: {
        margin: '15px 0'
    },
    modalActivity: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        '& > button': {
            margin: 0
        }
    }
}));

const initialProfile = {
    name: '',
    family_name: '',
    email: '',
    password: '**********',
}

const FormTypes = {
    PASSWORD: 'PASSWORD',
    EMAIL: 'EMAIL',
    NAME: 'NAME',
    CODE: 'CODE'
}

const modalTitle = {
    [FormTypes.CODE]: 'Verification via code from email',
    [FormTypes.PASSWORD]: 'Change password',
    [FormTypes.NAME]: 'Change name',
    [FormTypes.EMAIL]: 'Change email',
}

function Profile() {

    const [activeField, setActiveField] = useState(null)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [profile, setProfile] = useState(initialProfile)
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();

    const {
        register,
        handleSubmit,
        errors,
        setValue,
        getValues,
    } = useForm({
        mode: 'onBlur'
    });
    const getUserInfo = () => {
        currentAuthenticatedUser().then(user => {
            if (user.attributes) {
                if (user.attributes.name) {
                    setValue('name', user.attributes.name, {shouldValidate: true});
                    setProfile(prevState => ({...prevState, name: user.attributes.name}))
                }
                if (user.attributes.family_name) {
                    setValue('family_name', user.attributes.family_name, {shouldValidate: true});
                    setProfile(prevState => ({...prevState, family_name: user.attributes.family_name}))
                }
                if (user.attributes.email) {
                    setValue('email', user.attributes.email, {shouldValidate: true});
                    setProfile(prevState => ({...prevState, email: user.attributes.email}))
                }
            }
        })
    }
    useEffect(() => {
        getUserInfo()
    }, [])

    const onSubmit = data => {
        const {name, family_name, address, email, oldPass, newPass, code} = data
        if (activeField === FormTypes.PASSWORD) {
            dispatch(changePassword({oldPass, newPass}));
        } else if (activeField === FormTypes.CODE) {
            dispatch(confirmChangedEmail({
                attr: 'email',
                code: code,
                confirmationCallback: () => getUserInfo()
            }));
        } else {
            const formattedValues = cleanProperty(
                {
                    name,
                    family_name,
                    address,
                    email
                })
            if (Object.keys(formattedValues).length) {
                dispatch(updateUserAttributes({
                        info: formattedValues,
                        confirmationCallback: (type) => {
                            if (type === 'code'){
                                showModal(FormTypes.CODE)
                            } else {
                                getUserInfo()
                                window.location.reload(); //todo: remove after IL-265
                            }
                        }
                    }
                ));
            }
        }
        setIsConfirmModalOpen(false)
    }

    const getForm = (formName) => {
        switch (formName) {
            case FormTypes.CODE :
                return (
                    <Box className={classes.modalActive}>
                        <TextField
                            className={classes.codeInput}
                            fullWidth
                            required
                            key="code"
                            id="code"
                            label="code"
                            inputProps={{
                                name: "code",
                                ref: register({required: true})
                            }}
                            error={!!errors.code}
                        />
                    </Box>
                )
            case FormTypes.NAME:
                return (
                    <Box>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="First name"
                            type="text"
                            id="name"
                            inputProps={{
                                name: "name",
                                ref: register()
                            }}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="family_name"
                            label="Last name"
                            type="text"
                            id="family_name"
                            inputProps={{
                                name: "family_name",
                                ref: register()
                            }}
                            error={!!errors.family_name}
                            helperText={errors.family_name?.message}
                        />
                    </Box>
                )
            case FormTypes.EMAIL:
                return (
                    <Box className={classes.modalActive}>
                        <TextField
                            fullWidth
                            required
                            id="email"
                            label="Email"
                            inputProps={{
                                name: "email",
                                ref: register({
                                        validate: {
                                            pattern: v => /^(.+@.+\..+)+$/i.test(v) || 'Incorrect entry.'
                                        }
                                    }
                                )
                            }}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Box>
                )
            case FormTypes.PASSWORD:
                return (
                    <Box>
                        <FieldPassword
                            margin="normal"
                            required
                            fullWidth
                            name="oldPass"
                            label="Old Password"
                            id="oldPass"
                            autoComplete="current-password"
                            inputProps={{
                                name: "oldPass",
                                ref: register({
                                    validate: {
                                        pattern: v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/i.test(v)
                                            || 'Password must include [a-zA-z0-9!@#$%^&*]'
                                    }
                                })
                            }}
                            errors={errors}
                            helperText={errors.oldPass?.message}
                        />
                        <FieldPassword
                            margin="normal"
                            required
                            fullWidth
                            name="newPass"
                            label="New Password"
                            id="newPass"
                            autoComplete="current-password"
                            inputProps={{
                                name: "newPass",
                                ref: register({
                                    validate: {
                                        pattern: v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/i.test(v)
                                            || 'Password must include [a-zA-z0-9!@#$%^&*]',
                                        notSame: v => v !== getValues('oldPass') || 'The new password must not match the old one',
                                    }
                                })
                            }}
                            errors={errors}
                            helperText={errors.newPass?.message}
                        />
                    </Box>
                )
            default:
                return null
        }
    }

    const showModal = (name) => {
        setIsConfirmModalOpen(true);
        setActiveField(name);
    }
    return (
        <>
            <PageContainer>
              <Button
                onClick={() => {
                  history.goBack();
                }}
              >
                &lsaquo;-Back>
              </Button>
                <PageHeader title="Profile" isSearch={false}/>
                <Box className={classes.defaultForm}>
                    <TextField
                        disabled
                        label="First Name"
                        autoComplete="first-name"
                        value={profile.name}
                        type="text"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        className={classes.editButton}
                                        variant="contained"
                                        onClick={() => showModal(FormTypes.NAME)}
                                    >
                                        Edit
                                    </Button>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        disabled
                        label="Last Name"
                        autoComplete="last-name"
                        type="text"
                        value={profile.family_name}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        className={classes.editButton}
                                        variant="contained"
                                        onClick={() => showModal(FormTypes.NAME)}
                                    >
                                        Edit
                                    </Button>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        disabled
                        label="Login"
                        autoComplete="email"
                        type="email"
                        value={profile.email}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        className={classes.editButton}
                                        variant="contained"
                                        onClick={() => {
                                            showModal(FormTypes.EMAIL)
                                        }}
                                    >
                                        Change Login
                                    </Button>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        disabled
                        label="Password"
                        autoComplete="current-password"
                        type="password"
                        value={profile.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        className={classes.editButton}
                                        variant="contained"
                                        onClick={() => showModal(FormTypes.PASSWORD)}
                                    >
                                        Change password
                                    </Button>
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>
                <EmailConfirmedMessage/>
            </PageContainer>
            <Modal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                title={modalTitle[activeField]}
            >
                <FormControl
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className={classes.form}
                >
                    {getForm(activeField)}
                    <Divider className={classes.divider}/>
                    <Box className={classes.modalActivity}>
                        <Button
                            className={classes.submitButton}
                            variant="contained"
                            disableElevation
                            type="submit"
                            name="save"
                            size="small"
                            onClick={() => setIsConfirmModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={classes.submitButton}
                            variant="contained"
                            size="small"
                            color="primary"
                            disableElevation
                            type="submit"
                            name="save"
                        >
                            Save
                        </Button>
                    </Box>
                </FormControl>
            </Modal>
        </>
    );
}

export default Profile;
