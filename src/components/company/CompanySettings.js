import React from "react";
import Typography from '@material-ui/core/Typography';
import PageContainer from "../common/containers/PageContainer";
import {Button} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {useRouteMatch} from "react-router-dom";
import {history} from "../../redux";

function CompanySettings() {

    let { url } = useRouteMatch();

    const handleNavigate = path => {
        history.push(url + path);
    }

    return (
        <PageContainer>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>


            <Button
                variant="outlined"
                color="default"
                startIcon={<Add />}
                onClick={() => handleNavigate('/create-company')}
            >
                Add a Company!
            </Button>

        </PageContainer>
    );
}

export default CompanySettings;
