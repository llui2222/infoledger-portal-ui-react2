import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    codeField: {
        marginBottom: theme.spacing(1),
    },
}));

function MfaRequest({open, onSubmit, title}) {

    const classes = useStyles();
    const [code, setCode] = useState('');

    const handleConfirm = e => {
        e.preventDefault();
        onSubmit(code);
    }

    return (
        <Dialog open={open} maxWidth='xs'>

            <FormControl
                component="form"
                onSubmit={handleConfirm}
            >
                <DialogTitle>
                    {title}
                </DialogTitle>

                <DialogContent dividers>
                    <TextField
                        label="6-digit Authenticator Code"
                        value={code}
                        variant="outlined"
                        onChange={e => setCode(e.target.value)}
                        className={classes.codeField}
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
                        Verify
                    </Button>
                </DialogActions>
            </FormControl>
        </Dialog>
    );
}

export default MfaRequest;
