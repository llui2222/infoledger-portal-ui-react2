import React from "react";
import Typography from '@material-ui/core/Typography';
import PageContainer from "./PageContainer";
import { useParams } from "react-router-dom";

function Messenger() {

    const { name } = useParams();

    return (
        <PageContainer>
            <Typography variant="h4" gutterBottom>
                { name }
            </Typography>
        </PageContainer>
    );
}

export default Messenger;
