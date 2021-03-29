import React, { useState } from "react";
import {toBase64, fromBase64} from "@aws-sdk/util-base64-browser";
import {useDispatch} from "react-redux";
import {encryptMessage, decryptMessage} from "../redux/actions/encryption";
import {Box,TextField,Button, Typography} from '@material-ui/core';
import PageContainer from "./PageContainer";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';
import FileUploadPopup from "./FileUploadPopup";
import { encryptData, decryptData } from "../redux/api/encryption";

const useStyles = makeStyles((theme) => ({
    buttons: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4),
    },
    decryptButton: {
        marginLeft: theme.spacing(1),
    },
    encryptedMessage: {
        wordBreak: 'break-all',
    },
    uploadButton: {
        marginBottom: theme.spacing(2)
    }
}));

function EncryptDemo() {

    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [encrypted, setEncrypted] = useState(null);
    const classes = useStyles();

    const encryptedMessage = useSelector(state => state.encryption.encryptedMessage);
    const decryptedMessage = useSelector(state => state.encryption.decryptedMessage);

    const context = {
        identityId: 'identityId'
    }

    function handleEncrypt() {
        dispatch(
            encryptMessage(message, context)
        );
    }

    async function handleDecrypt() {

        console.time('Decrypt');
        decryptData({ message: encrypted, context }).then((decryptedData) => {
            console.timeEnd('Decrypt');
            console.log('Decrypted!');
        }, reason => {
            console.log(reason);
        });


        // dispatch(
        //     decryptMessage(encryptedMessage, context)
        // );
    }

    function handleFile(file) {

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = function() {

            const unit8Arr = new Uint8Array(reader.result);

            // console.log('unit8Arr', unit8Arr);

            console.time('Encrypt');

            encryptData({ message: unit8Arr, context }).then((encryptedData) => {
                console.timeEnd('Encrypt');
                setEncrypted(encryptedData);
                console.log('Encrypted');
            }, reason => {
                console.log(reason);
            });

            // dispatch(
            //     encryptMessage(unit8Arr, context)
            // );
        };

        reader.onerror = function() {
            // console.log(reader.error);
        };

    }

    // const decryptedUnit8Array = new Uint8Array(decryptedMessage.split(','));

    // console.log('encryptedMessage', encryptedMessage);
    // console.log('decryptedMessage', decryptedUnit8Array);

    return (
        <PageContainer>

            <FileUploadPopup
                handleFile={handleFile}
                className={classes.uploadButton}
            />

            <TextField
                label="Message"
                multiline
                rows={4}
                value={message}
                onChange={e => setMessage(e.currentTarget.value)}
                variant="outlined"
                fullWidth
            />
            <Box className={classes.buttons}>
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={handleEncrypt}
                >
                    Encrypt
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    disableElevation
                    className={classes.decryptButton}
                    onClick={handleDecrypt}
                >
                    Decrypt
                </Button>
            </Box>

            {/*{ decryptedMessage && <img src={`data:image/gif;base64,${toBase64(decryptedUnit8Array)}`}/> }*/}

            {/*{encryptedMessage &&*/}
            {/*    <>*/}
            {/*        <Typography variant="h6" gutterBottom>*/}
            {/*            Encrypted message*/}
            {/*        </Typography>*/}
            {/*        <Box className={classes.encryptedMessage}>{toBase64(encryptedMessage)}</Box>*/}
            {/*    </>*/}
            {/*}*/}

            {/*{decryptedMessage &&*/}
            {/*    <>*/}
            {/*        <Typography variant="h6" gutterBottom>*/}
            {/*            Decrypted message*/}
            {/*        </Typography>*/}
            {/*        <Box>{decryptedMessage}</Box>*/}
            {/*    </>*/}
            {/*}*/}

        </PageContainer>
    );
}

export default EncryptDemo;
