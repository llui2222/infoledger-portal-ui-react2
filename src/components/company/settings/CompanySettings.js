import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Typography,
    Grid,
    Button,
    Chip,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from '@material-ui/core';
import {Add, Edit, KeyboardArrowRight, FileCopy} from "@material-ui/icons";
import PageContainer from "../../common/containers/PageContainer";
import { useLocation, useRouteMatch } from "react-router-dom";
import Link from "../common/Link";
import {history} from "../../../redux";
import {useSelector} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import MfaSettings from "./MfaSettings";
import LogoutItem from "./LogoutItem";

const useStyles = makeStyles((theme) => ({
    editCompany: {
        marginLeft: '10px',
        color: 'black',
    },
    infoLedgerId: {
        display: 'flex',
    },
    profileButton: {
        margin: '30px 0 30px 0',
        width: '95%',
        textTransform: 'none',
        backGround: '#eeeeee',
        alignItems: 'left',
    },
    profileButtonDiv: {
        marginRight: 'auto',
    },
    messages: {
        marginTop: '30px',
        width: '95%',
    },
    field: {
        display: 'flex',
        marginBottom: '10px',
        padding: '10px 0 10px 0'
    },
    rightArrow: {
        marginLeft: 'auto',
    },
    logOut: {
        color: '#d32f2f',
        textTransform: 'none',
        fontSize: '1rem',
        padding: 0,
    },
    profileButtonText: {
        textAlign: 'left',
    },
    companyIdInput: {
        outline: 'none',
        border: 'none',
        background: '#fafafa',
        fontSize: '1.1rem',
    },
    Btn: {
        margin: '0 20px 10px auto',
        color: 'white',
    },
}));

function CompanySettings({ company }) {

    const classes = useStyles();
    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const ref = useRef(null);
    const {pathname} = useLocation();
    const childCompanies = useSelector(state => state.companies.childCompanies);

    useEffect(() => {
        getUserInfo()
    }, []);

    const id = useMemo(() => {
        const paths =  pathname.split('/')
        return paths[paths.length - 2];
    }, [pathname]);

    let { url } = useRouteMatch();

    const location = useLocation();

    const IdCopyHandler = () => {
        ref.current.select();
        document.execCommand('copy');
        ref.current.blur();
    };

    const handleNavigate = path => {
        history.push(url + path);
    }

    const redirectToProfileHandler = () => {
        history.push('/profile');
    };

    const logOutHandler = () => {
        history.push('/logout');
    }

    const getUserInfo = () => {
        currentAuthenticatedUser().then(user => {
            setUserName(user.attributes.name);
            setUserLastName(user.attributes.family_name);
        })
    };

    return (
        <PageContainer>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>

            <Link to={`${location.pathname}/profile`}>
                <Button
                    variant="outlined"
                    color="default"
                    className={classes.profileButton}
                    onClick={redirectToProfileHandler}
                >
                    <Box className={classes.profileButtonDiv}>
                        <p className={classes.profileButtonText}>Profile</p>
                        <p className={classes.profileButtonText}>{userName}&nbsp;<span>{userLastName}</span></p>
                    </Box>
                </Button>
            </Link>

            <Grid container spacing={2}>
                <Grid item>
                    {company.typeOfBusiness === 'ASSET_OWNER' &&
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<Add/>}
                            onClick={() => handleNavigate('/create-company')}
                        >
                            Add a Company!
                        </Button>
                    }
                </Grid>
                {childCompanies.map(company =>
                    <Grid item key={company.profileId}>
                        <Link to={`${location.pathname}/edit/${company.profileId}`}>
                            <Chip label={company.displayName}
                                  color="primary"
                                  onDelete={()=>{}}
                                  deleteIcon={<Edit />}/>
                        </Link>
                    </Grid>
                )}
            </Grid>

            <List>
                { company.typeOfBusiness === 'SERVICE_COMPANY' &&
                    <ListItem button divider onClick={() => handleNavigate('/account')}>
                        <ListItemText
                            primary="InfoLedger Id"
                            secondary={
                                <Box className={classes.infoLedgerId}>
                                    <input
                                        className={classes.companyIdInput}
                                        ref={ref} value={id}
                                        onChange={() => {}}
                                    />
                                    <Button
                                        className={classes.Btn}
                                        color="primary"
                                        variant="contained"
                                        size="small"
                                        onClick={IdCopyHandler}
                                    >
                                        <FileCopy/>
                                        Copy
                                    </Button>
                                </Box>
                            }
                        />
                    </ListItem>
                }
                <ListItem button divider onClick={() => handleNavigate('/account')}>
                    <ListItemText
                        primary="Account"
                        secondary={
                            company.profileType === 'INDIVIDUAL_INVESTOR' ?
                                'Individual'
                            :
                                company.displayName
                        }
                    />
                    <ListItemSecondaryAction>
                        <KeyboardArrowRight company={company}/>
                    </ListItemSecondaryAction>
                </ListItem>
                {(company.profileType === 'INDIVIDUAL_INVESTOR' || company.profileType === 'SERVICE_COMPANY') &&
                    <ListItem button divider onClick={() => handleNavigate('/account')}>
                        <ListItemText
                            primary="Notifications"
                            secondary=' '
                        />
                        <ListItemSecondaryAction>
                            <KeyboardArrowRight company={company} className={classes.rightArrow}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                }
                <ListItem button divider onClick={() => handleNavigate('/account')}>
                    <ListItemText
                        primary="User & Permission"
                        secondary=' '
                    />
                    <ListItemSecondaryAction>
                        <KeyboardArrowRight company={company} className={classes.rightArrow}/>
                    </ListItemSecondaryAction>
                </ListItem>
                {company.typeOfBusiness === 'ASSET_OWNER' && company.profileType !== 'INDIVIDUAL_INVESTOR' &&
                    <ListItem button divider onClick={() => handleNavigate('/account')}>
                        <ListItemText
                            primary="Workflows"
                            secondary=' '
                        />
                        <ListItemSecondaryAction>
                            <KeyboardArrowRight company={company} className={classes.rightArrow}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                }
                <MfaSettings/>
                <LogoutItem/>
            </List>
        </PageContainer>
    );
}

export default CompanySettings;
