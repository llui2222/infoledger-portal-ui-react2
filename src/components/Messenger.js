import React from "react";
import Typography from '@material-ui/core/Typography';
import MessengerContainer from "./MessengerContainer";
import { useParams } from "react-router-dom";

function Messenger() {

    const { name } = useParams();

    return (
        <MessengerContainer>
            <Typography variant="h4" gutterBottom>
                { name }
            </Typography>
        </MessengerContainer>
    );
}

export default Messenger;
