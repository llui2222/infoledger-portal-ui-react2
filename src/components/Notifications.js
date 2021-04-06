import React from "react";
import { Button } from '@material-ui/core';
import { Add, MoreHoriz } from '@material-ui/icons';
import PageContainer from "./common/containers/PageContainer";
import PageHeader from "./common/PageHeader";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    inviteButton: {
        marginRight: theme.spacing(1)
    },
}));

function Notifications() {

    const classes = useStyles();

    return (
        <PageContainer>
            <PageHeader title='Notifications'>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Add />}
                    className={classes.inviteButton}
                >
                    Invite
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<MoreHoriz />}
                >
                    More
                </Button>
            </PageHeader>
        </PageContainer>
    );
}

export default Notifications;
