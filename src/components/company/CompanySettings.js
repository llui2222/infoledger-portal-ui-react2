import React from "react";
import {Typography, Grid, Button, Chip, TextField} from '@material-ui/core';
import PageContainer from "../common/containers/PageContainer";
import {Add} from "@material-ui/icons";
import {useLocation, useRouteMatch} from "react-router-dom";
import {history} from "../../redux";
import {useSelector} from "react-redux";
import Link from "../common/Link";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  editCompany: {
    marginLeft: '10px',
    color: 'black',
  },
}));

function CompanySettings({ company }) {
  const classes = useStyles();

    let { url } = useRouteMatch();
    const childCompanies = useSelector(state => state.companies.childCompanies);
    const location = useLocation()
  console.log(`==========>location`, location)
    const handleNavigate = path => {
        history.push(url + path);
    }

    return (
        <PageContainer>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>

            <Grid container spacing={2}>
                <Grid item>
                    {company.typeOfBusiness === 'ASSET_OWNER' &&
                        <Button
                            variant="outlined"
                            color="default"
                            startIcon={<Add/>}
                            onClick={() => handleNavigate('/create-company')}
                        >
                            Add a Company!
                        </Button>
                    }
                </Grid>

                    {childCompanies.map(company =>
                        <Grid item key={company.profileId}>
                            <Chip label={company.displayName} />
                          <Link to={`${location.pathname}/${company.profileId}`}>
                            <BorderColorIcon  className={classes.editCompany}/>
                          </Link>
                            
                        </Grid>
                    )}
            </Grid>
        </PageContainer>
    );
}

export default CompanySettings;
