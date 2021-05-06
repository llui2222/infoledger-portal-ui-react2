import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import QRCode from 'qrcode.react';
import {
    TextField,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog, FormControl
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo_qr from '../../img/logo_qr.png'
import {getUserMfaSetupCode, verifyUserMfaSetupCode} from "../../redux/actions/user";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        width: 256,
        height: 256
    },
    authCodeField: {
        minWidth: 200,
        marginTop: theme.spacing(2)
    },
    qrcode: {
        marginTop: theme.spacing(2)
    }
}));

function MfaSetup({open, setOpen, onClose}) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const setupMfaCode = useSelector(state => state.user.setupMfaCode);
    const [code, setCode] = useState('');

    const currentUser = user.user;

    useEffect(() => {
        if(open && !setupMfaCode) {
            dispatch(getUserMfaSetupCode(currentUser));
        }
    }, [user, open])

    if(!setupMfaCode) {
        return null;
    }

    const handleConfirm = e => {
        e.preventDefault();
        setOpen(false);
        dispatch(verifyUserMfaSetupCode({user: currentUser, challengeAnswer: code}));
    }

    return (
        <Dialog open={open} maxWidth='xs' onClose={onClose}>

            <FormControl
                component="form"
                onSubmit={handleConfirm}
            >
                <DialogTitle>
                    Enable Multi-factor Authorization
                </DialogTitle>

                <DialogContent dividers>

                    <QRCode
                        className={classes.qrcode}
                        value={`otpauth://totp/AWSCognito:${currentUser.username}?secret=${setupMfaCode}&issuer=InfoLedger`}
                        size={256}
                        imageSettings={{
                            height: 40,
                            width: 40,
                            src: logo_qr
                        }}
                    />
                    <TextField
                        label="6-digit Authenticator Code"
                        value={code}
                        variant="outlined"
                        className={classes.authCodeField}
                        onChange={e => setCode(e.target.value)}
                        autoFocus
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        type='submit'
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </FormControl>
        </Dialog>
    );
}

export default MfaSetup;
