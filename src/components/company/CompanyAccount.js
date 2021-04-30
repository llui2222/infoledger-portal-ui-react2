import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import {Avatar, Box, TextField} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

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
  }
}));

const CompanyAccount = ({company}) => {
  const classes = useStyles();
  const history = useHistory();

  const [isOrgNameEdit, setIsOrgNameEdit] = useState('false');
  const [newOrgName, setNewOrgName] = useState('');
  const [orgName, setOrgName] = useState(company.displayName);
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
    setIsOrgNameEdit(!isOrgNameEdit);
  };

  const cancelOrgNameChangeHandler = () => {
    setIsOrgNameEdit(!isOrgNameEdit);
  };

  return (
    <div className={classes.root}>
      <Button
        onClick={() => {
          history.goBack();
        }}
      >
        &lsaquo;-Back>
      </Button>
      {
        isOrgNameEdit ? (
          <Box className={classes.orgNameTitle}>
            <Typography variant="h4" className={classes.orgName}>{orgName}</Typography>
            <BorderColorIcon className={classes.orgNameEdit} onClick={isOrgNameEditHandler}/>
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
                className={classes.Btn}
                variant="contained"
                size="small"
                onClick={saveOrgName}
              >
                <SaveIcon/>
                Save
              </Button>
              <Button
                className={classes.Btn}
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
          <Typography  className={classes.accountType}>{company.typeOfBusiness}</Typography>
        </Box>
        <hr/>
        <Box className={classes.field}>
          <Typography>Billing address</Typography>
          <Typography  className={classes.accountType}>
            <span>{company.billingAddress.postalCode}, </span>
            <span>{company.billingAddress.streetAddress}, </span>
            <span>{company.billingAddress.city}, </span>
            <span>{company.billingAddress.country}</span>
          </Typography>
        </Box>
        <hr/>
      </Box>
    </div>

  );
};

export default CompanyAccount;
