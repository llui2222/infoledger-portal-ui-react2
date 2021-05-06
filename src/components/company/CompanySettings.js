import React, { useEffect, useMemo, useRef, useState } from "react";
import { Typography, Grid, Button, Chip, Box } from '@material-ui/core';
import PageContainer from "../common/containers/PageContainer";
import { Add } from "@material-ui/icons";
import { useLocation, useRouteMatch } from "react-router-dom";
import { history } from "../../redux";
import { useSelector } from "react-redux";
import Link from "../common/Link";
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { currentAuthenticatedUser } from "../../redux/api/auth";
import FileCopyIcon from "@material-ui/icons/FileCopy";

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

const CompanySettings = ({ company }) => {
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const ref = useRef(null);
  const {pathname} = useLocation();

  const id = useMemo(() => {
    const paths =  pathname.split('/')
    return paths[paths.length - 2];
  }, [pathname]);

  let { url } = useRouteMatch();

  const childCompanies = useSelector(state => state.companies.childCompanies);
  const location = useLocation();

  const IdCopyHandler = () => {
    ref.current.select();
    document.execCommand('copy');
    ref.current.blur();
  };

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
                           deleteIcon={<EditIcon />}/>
                       </Link>
                     </Grid>
                    )}
            </Grid>
          <Box className={classes.messages}>
            {
              company.typeOfBusiness === 'SERVICE_COMPANY' &&
              <>
                  <Typography>InfoLedger Id</Typography>
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
                  <FileCopyIcon/>
                    Copy
                  </Button>
                </Box>
                <hr />
                </>
            }
            <Typography>
              Account
            </Typography>
              <Box className={classes.field}>
                {
                  (company.profileType !== 'INDIVIDUAL_INVESTOR') &&
                  <Typography>{company.displayName}</Typography>
                }
                {
                  (company.profileType === 'INDIVIDUAL_INVESTOR') &&
                  <Typography>Individual</Typography>
                }
                <Link to={`${location.pathname}/account`} className={classes.rightArrow}>
                  <KeyboardArrowRightIcon company={company}/>
                </Link>
              </Box>
              <hr/>
              {
                (company.profileType === 'INDIVIDUAL_INVESTOR' || company.profileType === 'SERVICE_COMPANY') &&
                <>
                  <Box className={classes.field}>
                    <Typography>Notifications</Typography>
                    <KeyboardArrowRightIcon company={company} className={classes.rightArrow}/>
                  </Box>
                  <hr />
                </>
              }
              <Box className={classes.field}>
                <Typography>User & Permission</Typography>
                <KeyboardArrowRightIcon company={company} className={classes.rightArrow}/>
              </Box>
              <hr/>
            {
              company.typeOfBusiness === 'ASSET_OWNER' && company.profileType !== 'INDIVIDUAL_INVESTOR' &&
                <>
                  <Box className={classes.field}>
                    <Typography>Workflows</Typography>
                    <KeyboardArrowRightIcon company={company} className={classes.rightArrow}/>
                  </Box>
                  <hr/>
                </>
            }
              <Box className={classes.field}>
                <Button className={classes.logOut} onClick={logOutHandler}>
                  Log Out
                </Button>
              </Box>
              <hr/>
          </Box>
        </PageContainer>
    );
}

export default CompanySettings;
