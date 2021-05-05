import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@material-ui/core";
import {useSelector} from "react-redux";

function MfaRequest() {

    const [code, setCode] = useState('');
    const userMfa = useSelector(state => state.user.userMfa);

    const handleConfirm = () => {

    }

    return (
        <Dialog open={!!userMfa} maxWidth='xs'>

            <DialogTitle>
                Authenticator Code
            </DialogTitle>

            <DialogContent dividers>
                <TextField
                    label="6-digit Authenticator Code"
                    value={code}
                    variant="outlined"
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
                    Verify
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default MfaRequest;
