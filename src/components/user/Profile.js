import React, {useEffect, useRef, useState} from "react";
import {
    Box,
    Button, Divider,
    FormControl, InputAdornment, TextField,
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
        '& > *:not(:last-child)': {
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
            if (user.attributes) {
                if (user.attributes.name) {
                    setValue('name', user.attributes.name, {shouldValidate: true});
                    setProfile(prevState => ({...prevState, email: user.attributes.email}))
                }
                if (user.attributes.family_name) {
                    setValue('family_name', user.attributes.family_name, {shouldValidate: true});
                    setProfile(prevState => ({...prevState, family_name: user.attributes.family_name}))
                }
                if (user.attributes.email) {
                    setValue('email', user.attributes.email, {shouldValidate: true});
                    setProfile(prevState => ({...prevState, name: user.attributes.name}))
                }
            }
        })
    }, [])


    const onSubmit = data => {
        const {name, family_name, address, email, oldPass, newPass} = data
        console.log(`==========>data`, data)
        // const formattedValues = cleanProperty(
        //     {
        //         name,
        //         family_name,
        //         address,
        //         email
        //     })
        // if (Object.keys(formattedValues).length) {
        //     dispatch(updateUserAttributes({
        //             info: cleanProperty(
        //                 {
        //                     name,
        //                     family_name,
        //                     address,
        //                     email
        //                 }
        //             ),
        //             confirmationCallback: (name) => {
        //                 setIsConfirmModalOpen(true)
        //                 setActiveField(FormTypes.CODE)
        //             }
        //         }
        //     ));
        // }
        // if (oldPass && newPass) {
        //     dispatch(changePassword({oldPass, newPass}));
        // }
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
            case FormTypes.CODE :
                return (
                    <Box className={classes.modalActive}>
                        <TextField
                            className={classes.codeInput}
                            inputRef={ref}
                            required
                            id="standard-basic"
                            label="code"
                            inputProps={{
                                name: "emailCode",
                                ref: register()
                            }}
                            error={!!errors.emailCode}
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
            case FormTypes.EMAIL:
                return (
                    <Box className={classes.modalActive}>
                        <TextField
                            fullWidth
                            required
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
            case FormTypes.PASSWORD:
                return <Box>
                    <TextField
                        borderBottom={1}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Old Password"
                        type="password"
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
                        error={!!errors.oldPass}
                        helperText={errors.oldPass?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="New Password"
                        type="password"
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
                        error={!!errors.newPass}
                        helperText={errors.newPass?.message}
                    />
                </Box>
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
                <PageHeader title="Profile" isSearch={false}/>
                <Box className={classes.defaultForm}>
                    <TextField
                        disabled
                        label="First Name"
                        autoComplete="first-name"
                        value={profile.name}
                        type="text"
                    />
                    <TextField
                        disabled
                        label="Last Name"
                        autoComplete="last-name"
                        type="text"
                        value={profile.family_name}
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
                                        Edit
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
