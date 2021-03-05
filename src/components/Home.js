import React from "react";
import Typography from '@material-ui/core/Typography';
import MessengerContainer from "./MessengerContainer";

function Home() {

    return (
        <MessengerContainer>
            <Typography variant="h4" gutterBottom>
                Home
            </Typography>
        </MessengerContainer>
    );
}

export default Home;
