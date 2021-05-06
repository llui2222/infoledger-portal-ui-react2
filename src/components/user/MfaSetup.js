import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {setupTOTP, verifyTotpToken, setPreferredMFA} from "../../redux/api/auth";
import QRCode from 'qrcode.react';
import {
    TextField,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo_qr from '../../img/logo_qr.png'
import showErrorNotification from "../../utils/showErrorNotification";

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
}));

function MfaSetup() {

    const classes = useStyles();
    const user = useSelector(state => state.user);
    const [setUpCode, setSetUpCode] = useState(null);
    const [code, setCode] = useState('');

    const currentUser = user.user;

    useEffect(() => {

        if(currentUser) {
            setupTOTP({user: currentUser}).then((code) => {
                setSetUpCode(code);
            });
        }

    }, [user])

    if(!setUpCode) {
        return null;
    }

    const str = "otpauth://totp/AWSCognito:" + currentUser.username + "?secret=" + setUpCode + "&issuer=InfoLedger";

    const handleConfirm = () => {

        verifyTotpToken({user: currentUser, challengeAnswer: code}).then(() => {
            setPreferredMFA({user: currentUser, MFAType: 'TOTP'}).then(() => {
                console.log('setPreferredMFA data');
            }).catch(error => {
                showErrorNotification(error);
            })
        }).catch( error => {
            showErrorNotification(error);
        });
    }

    return (
        <Dialog open={true} maxWidth='xs'>

            <DialogTitle>
                Set Up Multi-factor Authorization
            </DialogTitle>

            <DialogContent dividers>

                <QRCode
                    value={str}
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
                />
            </DialogContent>

            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={handleConfirm}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default MfaSetup;
