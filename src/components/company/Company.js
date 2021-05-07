import React from "react";
import { Typography, Box } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import PageContainer from "../common/containers/PageContainer";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        width: '100%',
    },
}));

function Company({ company }) {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <PageContainer>
                <Typography variant="h4" gutterBottom>
                    {company.displayName}
                </Typography>
            </PageContainer>
        </Box>
    );
}

export default Company;
