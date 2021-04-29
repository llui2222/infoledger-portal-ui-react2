import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from '@material-ui/core/styles';
import {TextField} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";

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
  const {
    errors,
    control,
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      postalCode: '',
    }
  });

  return (
        <div>
          {props.disabled ? (
            <div className={classes.messages}>
              <div className={classes.businessAddressInputs}>
                    <TextField
                      id={props.name}
                      label={props.title}
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


              <Controller
                defaultValue={props.defaultValue}
                name={props.name}
                control={control}
                render={(onChange) => (
                  <TextField
                    id={props.name}
                    label={props.title}
                    type="text"
                    defaultValue={props.defaultValue}
                    onChange={props.changeFieldHandler }
                  />
                )}
                name={props.name}
                rules={{ required: true }}
                defaultValue={props.defaultValue}
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
