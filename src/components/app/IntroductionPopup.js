import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Switch,
    TextField,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MfaSetup from "../user/MfaSetup";
import {useDispatch, useSelector} from "react-redux";
import {disableUserMfa, updateUserAttributes} from "../../redux/actions/user";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    popupContentBody: {
        textAlign: 'left',
    },
}));

function IntroductionPopup() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user.user);
    const [name, setName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [openMfaSetupPopup, setOpenMfaSetupPopup] = useState(false);

    useEffect(() => {

        if(user.attributes.name || user.attributes.family_name) {
            history.push('/');
        }
    }, [user])

    const disableMfa = () => {
        dispatch(disableUserMfa({user}));
    }

    const saveData = e => {
        e.preventDefault();
        dispatch(updateUserAttributes({
                info: {
                    name: name,
                    family_name: familyName
                }
            }
        ));
    }

    const handleMfaSwitch = e => {
        if(user.preferredMFA && user.preferredMFA !== 'NOMFA') {
            disableMfa();
        } else {
            setOpenMfaSetupPopup(true);
        }
    }

    const mfaState = () => {
        return !!(user.preferredMFA && user.preferredMFA !== 'NOMFA');
    }

    return (
        <Dialog open={true} maxWidth='xs'>

            <FormControl
                component="form"
                onSubmit={saveData}
            >
                <DialogTitle>
                    Welcome to InfoLedger
                </DialogTitle>

                <DialogContent dividers className={classes.popupContentBody}>

                    <Typography variant='body2'>
                        Please specify your first and last name
                    </Typography>

                    <TextField
                        label="First Name"
                        variant="outlined"
                        autoFocus
                        margin="normal"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <TextField
                        label="Last Name"
                        variant="outlined"
                        margin="normal"
                        value={familyName}
                        onChange={e => setFamilyName(e.target.value)}
                    />

                    <FormControlLabel
                        margin="normal"
                        label="Enable Multi-factor Authorization"
                        control={
                            <Switch
                                checked={mfaState()}
                                onChange={handleMfaSwitch}
                            />
                        }
                    />

                </DialogContent>

                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        type='submit'
                        disabled={!name || !familyName}
                    >
                        Save
                    </Button>
                </DialogActions>
            </FormControl>

            <MfaSetup
                open={openMfaSetupPopup}
                setOpen={setOpenMfaSetupPopup}
                onClose={() => setOpenMfaSetupPopup(false)}
            />

        </Dialog>
    );
}

export default IntroductionPopup;
