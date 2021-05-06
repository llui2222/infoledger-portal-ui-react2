import React from "react";
import {
    Typography,
    Grid,
    Button,
    Chip,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import PageContainer from "../../common/containers/PageContainer";
import {Add} from "@material-ui/icons";
import {useRouteMatch} from "react-router-dom";
import {history} from "../../../redux";
import {useSelector} from "react-redux";
import MfaSettings from "./MfaSettings";
import LogoutItem from "./LogoutItem";

function CompanySettings({ company }) {

    let { url } = useRouteMatch();
    const childCompanies = useSelector(state => state.companies.childCompanies);

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
                        </Grid>
                    )}
            </Grid>

            <List>
                <ListItem button divider>
                    <ListItemText primary="Account" secondary="Org Name LLC" />
                </ListItem>
                <ListItem button divider>
                    <ListItemText primary="Users & Permissions" />
                </ListItem>
                <ListItem button divider>
                    <ListItemText primary="Workflows" />
                </ListItem>
                <MfaSettings/>
                <LogoutItem/>
            </List>
        </PageContainer>
    );
}

export default CompanySettings;
