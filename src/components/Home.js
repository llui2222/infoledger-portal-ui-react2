import React from "react";
import Typography from '@material-ui/core/Typography';
import PageContainer from "./common/containers/PageContainer";

function Home() {

    return (
        <PageContainer>
            <Typography variant="h4" gutterBottom>
                Notifications
            </Typography>
        </PageContainer>
    );
}

export default Home;
