import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  messages: {
    display: 'flex',
    marginTop: '20px',
    width: '95%',
    alignItems: 'center',
  },
  businessAddressInputs: {
    display: 'flex',
    flexDirection: 'column',
  },
  Btn: {
    marginLeft: 'auto',
    marginRight: '20px',
  },
  BtnGroup: {
    marginTop: '10px',
  },
}));

const CompanyBusinessAddress = (props) => {
  const classes = useStyles();

  return (
        <div>
          {props.disabled ? (
            <div className={classes.messages}>
              <div className={classes.businessAddressInputs}>
                <label htmlFor={props.name}>{props.title}</label>
                <input
                  id={props.name}
                  type="text"
                  defaultValue={props.defaultValue}
                  disabled={props.disabled}
                />
              </div>
              <Button
                className={classes.Btn}
                variant="contained"
                size="small"
                onClick={props.setFieldHandler}
              >
                <CreateIcon/>
                Edit
              </Button>
            </div>
          ) : null}

          {!props.disabled ? (
          <div   className={classes.messages}>
            <div className={classes.businessAddressInputs}>
              <label htmlFor={props.name}>{props.title}</label>
              <input
                id={props.name}
                type="text"
                defaultValue={props.defaultValue}
                onChange={props.changeFieldHandler}
              />
              <div  className={classes.BtnGroup}>
                <Button
                  className={classes.Btn}
                  variant="contained"
                  size="small"
                  onClick={props.saveFieldHandler}
                >
                  <SaveIcon/>
                  Save
                </Button>
                <Button
                  className={classes.Btn}
                  variant="contained"
                  size="small"
                  onClick={props.cancelFieldHandler}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
          ):null}
        </div>
  );
};

export default CompanyBusinessAddress;
