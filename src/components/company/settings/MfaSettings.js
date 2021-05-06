import React, {useState} from "react";
import {ListItem, ListItemText} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import MfaSetup from "../../user/MfaSetup";
import MfaRequest from "../../user/MfaRequest";
import {disableUserMfa} from "../../../redux/actions/user";

function MfaSettings() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const [mfaSetupOpen, setMfaSetupOpen] = useState(false);
    const [mfaDisableOpen, setMfaDisableOpen] = useState(false);

    const handleClickDisableMfa = () => {
        setMfaDisableOpen(true);
    }

    const handleEnableMfa = () => {
        setMfaSetupOpen(true);
    }

    const handleClose = () => {
        setMfaSetupOpen(false);
    }

    const disableMfa = code => {
        setMfaDisableOpen(false);
        dispatch(disableUserMfa({user, code}));
    }

    return (
        <>
            { user.preferredMFA && user.preferredMFA !== 'NOMFA' ?
                <ListItem button divider onClick={handleClickDisableMfa}>
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
            <MfaRequest
                open={mfaDisableOpen}
                onSubmit={disableMfa}
                title='Disable MFA'
            />
        </>
    );
}

export default MfaSettings;
