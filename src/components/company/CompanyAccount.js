import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Avatar, Box, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { useSelector } from 'react-redux';
import { gql, useMutation, useQuery } from '@apollo/client';
import { updateProfile } from '../../graphql/mutations';
import { allProfiles } from '../../graphql/queries';
import green from "@material-ui/core/colors/green";
import { red } from "@material-ui/core/colors";

const greenBtn = green[400];
const redBtn = red[700];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '5%',
  },
  orgNameTitle: {
      display: 'flex',
  },
  orgNameEdit: {
    marginTop: '10px',
  },
  orgName: {
    margin: '0 20px 30px 0',
  },
  orgNameEditInput: {
    marginTop: '30px',
  },
  btnGroup: {
    marginTop: '10px',
  },
  Btn: {
    marginLeft: 'auto',
    marginRight: '20px',
  },
  saveBtn: {
    background: greenBtn,
    color: 'white',
    marginLeft: 'auto',
    marginRight: '20px',
  },
  cancelBtn: {
    background: redBtn,
    color: 'white',
  },
  messages: {
    display: 'flex',
    marginTop: '20px',
    width: '95%',
    alignItems: 'center',
  },
  field: {
    margin: '20px 0 20px 0',
  },
  accountType: {
    fontSize: '1.2rem',
    marginTop: '10px',
  },
  backBtn: {
    margin: '20px 0 30px 0',
  },
}));

const CompanyAccount = ({company}) => {
  const classes = useStyles();
  const history = useHistory();
  const [updateCompany] = useMutation(gql(updateProfile));

  const [isOrgNameEdit, setIsOrgNameEdit] = useState('false');
  const [newOrgName, setNewOrgName] = useState('');
  const [orgName, setOrgName] = useState(company?.displayName);
  const {data, refetch: refetch1} = useQuery(gql(allProfiles));

  const isOrgNameEditHandler = () => {
    setIsOrgNameEdit(!isOrgNameEdit);
  };

  const changeOrgNameHandler = (e) => {
    e.preventDefault();
    setNewOrgName(e.target.value);
  };

  const saveOrgName= () => {
    if (newOrgName.length !== 0) {
      setOrgName(newOrgName);
    }
    updateCompany({
      variables: {
        profileId: company.profileId,
        profile: {
          currency: company.currency,
          profileName: newOrgName,
          profileType: company.profileType,
          typeOfBusiness: company.typeOfBusiness,
          billingAddress: {
            country: company.billingAddress?.country,
          }
        }
      }
    }).then(() => {
      refetch1()
    })
    setIsOrgNameEdit(!isOrgNameEdit);
  };

  const cancelOrgNameChangeHandler = () => {
    setIsOrgNameEdit(!isOrgNameEdit);
  };

  return (
    <div className={classes.root}>
      <Button
        className={classes.backBtn}
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          history.goBack();
        }}
      >
        Back
      </Button>
      {
        isOrgNameEdit ? (
          <Box className={classes.orgNameTitle}>
            <Typography variant="h4" className={classes.orgName} data-testid="orgName">{orgName}</Typography>
            <BorderColorIcon className={classes.orgNameEdit} onClick={isOrgNameEditHandler} data-testid="companyName-edit"/>
          </Box>
        ) : (
          <Box>
            <TextField
              className={classes.orgNameEditInput}
              defaultValue={orgName}
              onChange={changeOrgNameHandler}
              autoFocus
            />
            <Box className={classes.btnGroup}>
              <Button
                className={classes.saveBtn}
                variant="contained"
                size="small"
                onClick={saveOrgName}
              >
                <SaveIcon/>
                Save
              </Button>
              <Button
                className={classes.cancelBtn}
                variant="contained"
                size="small"
                onClick={cancelOrgNameChangeHandler}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )
      }
      <Box>
        <Typography>Avatar</Typography>
        <Box className={classes.field}>
          <Avatar alt="organization avatar"/>
        </Box>
        <hr/>
        <Box className={classes.field}>
          <Typography>Account type</Typography>
          <Typography  className={classes.accountType}>{company?.profileType}</Typography>
        </Box>
        <hr/>
        <Box className={classes.field}>
          <Typography>Billing address</Typography>
          <Typography className={classes.accountType} data-testid="businessAddress">
            {company?.billingAddress?.postalCode &&
            <span>{company?.billingAddress?.postalCode}, </span>
            }
            {company?.billingAddress?.streetAddress &&
            <span>{company?.billingAddress?.streetAddress}, </span>
            }
            {company?.billingAddress?.city &&
            <span>{company?.billingAddress?.city}, </span>
            }
            {company?.billingAddress?.country &&
            <span>{company?.billingAddress?.country}</span>
            }
          </Typography>
        </Box>
        <hr/>
      </Box>
    </div>
  );
};

export default CompanyAccount;
