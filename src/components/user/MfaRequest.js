import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    TextField
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {confirmMfa} from "../../redux/actions/user";

const useStyles = makeStyles((theme) => ({
    codeField: {
        marginBottom: theme.spacing(1),
    },
}));

function MfaRequest() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const user = useSelector(state => state.user);
    const userMfa = user.userMfa;

    const handleConfirm = e => {
        e.preventDefault();
        dispatch(confirmMfa({user: user.user, code}));
    }

    return (
        <Dialog open={!!userMfa} maxWidth='xs'>

            <FormControl
                component="form"
                onSubmit={handleConfirm}
            >
                <DialogTitle>
                    Authenticator Code
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
