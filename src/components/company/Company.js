import React from "react";
import { Typography, Box } from '@material-ui/core';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import PageContainer from "../common/containers/PageContainer";
import CompanySidebar from "./CompanySidebar";
import CompanyCreatePopup from "./CompanyCreatePopup";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        width: '100%',
    },
}));

function Company() {

    const classes = useStyles();
    let { companyID } = useParams();
    const companies = useSelector(state => state.companies.companies);

    if(companyID === 'create-company') {
        return <CompanyCreatePopup/>
    }

    if(companies.length === 0) {
        return null;
    }

    const company = companies.find(company => {
        return company.profileId === companyID
    });

    return (
        <Box className={classes.container}>
           <CompanySidebar company={company} />
            <PageContainer>
                <Typography variant="h4" gutterBottom>
                    {company.displayName}
                </Typography>
            </PageContainer>
        </Box>
    );
}

export default Company;
