import React, {useEffect, useRef, useState} from "react";
import {
    Accordion, AccordionDetails,
    AccordionSummary, Box,
    Button,
    FormControl, Modal, TextField,
} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import EmailConfirmedMessage from "../common/EmailConfirmedMessage";
import {useForm} from "react-hook-form";
import {currentAuthenticatedUser} from "../../redux/api/auth";
import PageContainer from "../common/containers/PageContainer";
import PageHeader from "../common/PageHeader";
import TextInputWithAdornment from "../shared/TextInputWithAdornment";
import {confirmChangedEmail, confirmEmail, updateUserAttributes} from "../../redux/actions/user";
import {cleanProperty} from "../../utils/cleanProperty";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    form: {
        margin: 'auto',
        width: '100%'
    },
    submitButton: {
        margin: `${theme.spacing(1)}px 0 0 auto`
    },
    passwordAccordion: {
        border: 'none!important',
        boxShadow: 'none',
        '& div': {
            padding: 0
        },
        "& .Mui-focused": {
            backgroundColor: "inherit"
        }
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
    }
}));

function Profile() {

    const [activeFields, setActiveFields] = useState({})
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const dispatch = useDispatch();
    const classes = useStyles();
    const ref = useRef(null);

    const {register, handleSubmit, errors, setValue} = useForm({
        mode: 'onChange'
    });

    useEffect(() => {
        currentAuthenticatedUser().then(user => {
            if (user.attributes) {
                user.attributes.name && setValue('name', user.attributes.name, {shouldValidate: true});
                user.attributes.family_name && setValue('family_name', user.attributes.family_name, {shouldValidate: true});
                user.attributes.address && setValue('address', user.attributes.address, {shouldValidate: true});
                user.attributes.email && user.attributes.email_verified && setValue('email', user.attributes.email, {shouldValidate: true});
            }
        })
    }, [])

    const isPasswordActive = Object.keys(activeFields).includes('oldPass')

    const onSubmit = data => {
        console.log(`==========>data`, data)
        const {name, family_name, address, email} = data
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
    
    const handleConfirm = () => {
        dispatch(confirmChangedEmail('email', ref.current.value));
        setIsConfirmModalOpen(false)
    }

    return (
        <>
            <PageContainer>
                <PageHeader title="Profile" isSearch={false}/>
                <FormControl
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className={classes.form}
                >

                    <TextInputWithAdornment
                        required
                        id="first-name"
                        label="First Name"
                        autoComplete="first-name"
                        inputProps={{
                            name: "name",
                            ref: register({pattern: /^[A-Za-z]+$/i,})
                        }}
                        error={!!errors.name}
                        helperText={!!errors.name && "Incorrect entry."}
                    />
                    <TextInputWithAdornment
                        required
                        id="last-name"
                        label="Last Name"
                        autoComplete="last-name"
                        type="text"
                        inputProps={{
                            name: "family_name",
                            ref: register({pattern: /^[A-Za-z]+$/i}),
                        }}
                        error={!!errors.family_name}
                        helperText={!!errors.family_name && "Incorrect entry."}
                    />
                    <TextInputWithAdornment
                        required
                        id="address"
                        label="Address"
                        autoComplete="address"
                        type="text"
                        inputProps={{
                            name: "address",
                            ref: register({pattern: /^[A-Za-z]+$/i})
                        }}
                        error={!!errors.address}
                        helperText={!!errors.address && "Incorrect entry."}
                    />
                    <TextInputWithAdornment
                        required
                        id="email"
                        label="Email"
                        autoComplete="email"
                        type="email"
                        inputProps={{
                            name: "email",
                            ref: register({pattern: /^(.+@.+\..+)+$/i})
                        }}
                        error={!!errors.email}
                        helperText={!!errors.email && "Incorrect entry."}
                    />
                    <Accordion className={classes.passwordAccordion} expanded={isPasswordActive}>
                        <AccordionSummary>
                            <TextInputWithAdornment
                                required={isPasswordActive}
                                id="oldPass"
                                label="Old password"
                                onEditChange={(isActive) => setActiveFields(prevState => ({
                                    ...prevState,
                                    oldPass: isActive
                                }))}
                                autoComplete="current-password"
                                type="password"
                                inputProps={{
                                    name: "oldPass",
                                    ref: register()
                                }}
                                error={!!errors.oldPass}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextInputWithAdornment
                                required={isPasswordActive}
                                disabled={!isPasswordActive}
                                id="newPass"
                                label="Password"
                                autoComplete="new-password"
                                type="password"
                                inputProps={{
                                    name: "newPass",
                                    ref: register()
                                }}
                                error={!!errors.newPass}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Button
                        className={classes.submitButton}
                        variant="contained"
                        size="large"
                        color="primary"
                        disableElevation
                        type="submit"
                        name="save"
                    >
                        Save
                    </Button>
                </FormControl>
                <EmailConfirmedMessage/>
            </PageContainer>
            <Modal
                open={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
            >
                <Box className={classes.paper}>
                    <Typography variant="h4" component="h4" gutterBottom>
                        confirm by code from your email
                    </Typography>
                    <Box className={classes.modalActive}>
                        <TextField
                            className={classes.codeInput} 
                            inputRef={ref} 
                            id="standard-basic"
                            label="code"
                        />
                        <Button 
                            variant="contained"
                            color="primary"
                            onClick={handleConfirm}
                        >
                            send
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

export default Profile;
