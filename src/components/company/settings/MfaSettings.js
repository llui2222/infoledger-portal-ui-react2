import React, {useState} from "react";
import {ListItem, ListItemText} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import MfaSetup from "../../user/MfaSetup";
import {disableUserMfa} from "../../../redux/actions/user";

function MfaSettings() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const [mfaSetupOpen, setMfaSetupOpen] = useState(false);

    const handleEnableMfa = () => {
        setMfaSetupOpen(true);
    }

    const handleClose = () => {
        setMfaSetupOpen(false);
    }

    const disableMfa = code => {
        dispatch(disableUserMfa({user, code}));
    }

    return (
        <>
            { user.preferredMFA && user.preferredMFA !== 'NOMFA' ?
                <ListItem button divider onClick={disableMfa}>
                    <ListItemText
                        primary="Disable Multi-factor Authorization"
                    />
                </ListItem>
                :
                <ListItem button divider onClick={handleEnableMfa}>
                    <ListItemText
                        primary="Enable Multi-factor Authorization"
                    />
                </ListItem>
            }
            <MfaSetup open={mfaSetupOpen} setOpen={setMfaSetupOpen} onClose={handleClose} />
        </>
    );
}

export default MfaSettings;
