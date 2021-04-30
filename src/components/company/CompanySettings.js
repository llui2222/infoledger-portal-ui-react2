import React, {useEffect, useState} from "react";
import {Typography, Grid, Button, Chip, TextField, Box} from '@material-ui/core';
import PageContainer from "../common/containers/PageContainer";
import {Add} from "@material-ui/icons";
import {Redirect, useLocation, useRouteMatch} from "react-router-dom";
import {history} from "../../redux";
import {useSelector} from "react-redux";
import Link from "../common/Link";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {makeStyles} from "@material-ui/core/styles";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import {currentAuthenticatedUser} from "../../redux/api/auth";

const useStyles = makeStyles((theme) => ({
  editCompany: {
    marginLeft: '10px',
    color: 'black',
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
  },
  profileButtonText: {
    textAlign: 'left',

  },
}));


const CompanySettings = ({ company }) => {
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');

  let { url } = useRouteMatch();

  const childCompanies = useSelector(state => state.companies.childCompanies);
  const location = useLocation();

  const handleNavigate = path => {
    history.push(url + path);
  };

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

  useEffect(() => {
    getUserInfo()
  }, []);

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
                       <Link to={`${location.pathname}/edit/${company.profileId}`}>
                         <Chip label={company.displayName}
                           onDelete={()=>{}}
                           deleteIcon={<BorderColorIcon />}/>
                       </Link>
                     </Grid>
                    )}
            </Grid>
          <Box className={classes.messages}>
            <Typography>
              Account
            </Typography>
            <Box className={classes.field}>
              <Typography>{company.displayName}</Typography>
              <Link to={`${location.pathname}/account`} className={classes.rightArrow}>
                <KeyboardArrowRightIcon company={company}/>
              </Link>
            </Box>
            <hr/>
            <Box className={classes.field}>
              <Typography>User & Permission</Typography>
                <KeyboardArrowRightIcon company={company} className={classes.rightArrow}/>
            </Box>
            <hr/>
            <Box className={classes.field}>
              <Typography>Workflows</Typography>
              <KeyboardArrowRightIcon company={company} className={classes.rightArrow}/>
            </Box>
            <hr/>
            <Box className={classes.field}>
              <Button
                className={classes.logOut}
                onClick={logOutHandler}
              >Log Out</Button>
            </Box>
            <hr/>
          </Box>
        </PageContainer>
    );
}

export default CompanySettings;
