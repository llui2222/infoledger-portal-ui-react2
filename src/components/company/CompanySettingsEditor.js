import React, {useState, useEffect, useLayoutEffect, useMemo, useRef} from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import {Chip, InputAdornment, TextField} from "@material-ui/core";
import WarningIcon from '@material-ui/icons/Warning';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CreateIcon from '@material-ui/icons/Create';
import Typography from "@material-ui/core/Typography";
import {useLocation} from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Controller, useForm} from "react-hook-form";
import currencies from "../../data/currencies";
import countries from "../../data/countries";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '5%',
  },
  addressInput: {
    width: '95%',
   border: 'none',
  },
  InfoLedgerContainer: {
    display: 'flex',
    marginTop: '10px',
  },
  InfoLedgerText: {
    // marginTop: '60px',
  },
  InfoLedgerId: {
    width: '90%',
  },
  companyIdInput: {
    outline: 'none',
    border: 'none',
    background: '#fafafa',
  },
  hr: {
    width: '95%',
    marginLeft: 0,
  },
  messages: {
    display: 'flex',
    marginTop: '20px',
    width: '95%',
    alignItems: 'center',
  },
  TextMessages: {
    marginRight: '10px',
  },
  rightArrow: {
    marginLeft: 'auto',
  },
  Btn: {
    marginLeft: 'auto',
  },
  currency: {
    fontWeight: 'bold',
  },
  timeInput: {
    outline: 'none',
    border: 'none',
    background: '#fafafa',
  },
  currencyInput: {
    outline: 'none',
    border: 'none',
    background: '#fafafa',
    color: 'black',
  },
}));


const CompanySettingsEditor = ({company}) => {
  const classes = useStyles();
  const {pathname} = useLocation();
  const ref = useRef(null);
  const [timeDisabled, setTimeDisabled] = useState(true);
  const [currencyDisabled, setCurrencyDisabled] = useState(true);
  const [currencyValue, setCurrencyValue] = useState('USD');

  const currencyOptions = Object.entries(currencies).map(currency => ({
    code: currency[0],
    name: currency[1]
  }));

  const defaultCurrency = {code: '',name: ''};

  const {
    errors,
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      companyName: '',
      accountType: '',
      companyType: '',
      typeOfBusiness: '',
      baseCurrency: defaultCurrency,
      country: countries[0],
      address: '',
      postalCode: '',
    }
  });

  const id = useMemo(() => {
    const paths =  pathname.split('/')
    return paths[paths.length - 1];
  }, [pathname]);

  const IdCopyHandler = () => {
    ref.current.select();
    document.execCommand('copy');
    ref.current.blur();
  };

  const setTimeHandler = () => {
    setTimeDisabled(false);
  };

  const setCurrencyHandler = () => {
    setCurrencyDisabled(false);
  };

  const currencyChangeHandler = (event) => {
    // setCurrencyValue(event.target.value);
   // setCurrencyDisabled(true);
    console.log(`==========>event.target.value`, event.target.value)
  }

  return (
    <div className={classes.root}>
      <Button>&lsaquo;-Back></Button>
      <h1>New Fund</h1>
      <TextField
        className={classes.addressInput}
        id="outlined-basic"
        label="Specify your address"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <WarningIcon />
            </InputAdornment>
          ),
        }}
      />
      {/*//================= Copy Id ============*/}
      <div   className={classes.messages}>
       <div>
         <Typography className={classes.InfoLedgerText}>InfoLedger Id</Typography>
         <input
           className={classes.companyIdInput}
           ref={ref} value={id}
           onChange={() => {}}
         />
       </div>
          <Button
            className={classes.Btn}
            variant="contained"
            size="small"
            onClick={IdCopyHandler}
          >
            <FileCopyIcon/>
            Copy
          </Button>
      </div>
      <hr className={classes.hr}/>
      {/*//========================================*/}

      {/*//=================== Users ==============*/}
      <div   className={classes.messages}>
        <Typography className={classes.TextMessages}>
          Outgoing regular messages
        </Typography>
        <Chip label="1" style={{marginTop: '-5px'}}/>
        <KeyboardArrowRightIcon className={classes.rightArrow}/>
      </div>
      <hr className={classes.hr}/>

      <div   className={classes.messages}>
        <Typography className={classes.TextMessages}>
          Users
        </Typography>
        <Chip label="0" style={{marginTop: '-5px'}}/>
        <KeyboardArrowRightIcon className={classes.rightArrow}/>
      </div>
      <hr className={classes.hr}/>
      {/*//========================================*/}

      {/*//================= Time =================*/}
      <div   className={classes.messages}>
        <div>
          <Typography className={classes.TextMessages}>
            Sending time
          </Typography>
          {!timeDisabled ? <input  className={classes.timeInput} type="time"/> : null}
        </div>

        <Button
          className={classes.Btn}
          variant="contained"
          size="small"
          onClick={setTimeHandler}
        >
          Set time
        </Button>
      </div>
      <hr className={classes.hr}/>
      {/*//==============================================*/}

      {/*//================ Currency ====================*/}
      <div   className={classes.messages}>
        <div>
          <Typography className={classes.currency}>
            About
          </Typography>
          <Typography>
            Currency
          </Typography>

          <input
            className={classes.currencyInput}
          type="text"

            value={currencyValue}
          />
          {
            !currencyDisabled ? (
              <div>
                <Controller
                  onChange={([, data]) => data}
                  defaultValue={defaultCurrency}
                  name="baseCurrency"
                  control={control}
                  rules={{
                    required: true,
                    validate: value => value !== defaultCurrency
                  }}
                  render={({ onChange, ...props }) => (
                    <Autocomplete
                      disableClearable
                      options={[defaultCurrency, ...currencyOptions]}
                      getOptionLabel={option => option.code}
                      renderOption={option => option.code}
                      getOptionSelected={(option, value) => option.code === value.code}
                      onChange={(e, data) => onChange(data)}
                      {...props}
                      renderInput={params => (
                        <TextField

                          {...params}
                          error={!!errors.baseCurrency}
                          margin="normal"
                          label="Base Currency"
                          variant="outlined"
                        />
                      )}
                    />
                  )}
                />
              </div>
            ) : null
          }
        </div>
        <Button
          className={classes.Btn}
          variant="contained"
          size="small"
          onClick={setCurrencyHandler}
        >
          <CreateIcon/>
          Edit
        </Button>
      </div>
      <hr className={classes.hr}/>
{/*//================================================*/}

{/*//============== Country ========================*/}
      <div   className={classes.messages}>
        <div>
          <Typography>
            Country
          </Typography>
          <Typography>
            United States
          </Typography>
        </div>
        <Button
          className={classes.Btn}
          variant="contained"
          size="small"
        >
          <CreateIcon/>
          Edit
        </Button>
      </div>
      <hr className={classes.hr}/>
{/*//================================================*/}

{/*//================= Business address ==============*/}
      <div   className={classes.messages}>
        <div>
          <Typography>
            Business address
          </Typography>
          <Typography>
            Not specified
          </Typography>
        </div>
        <Button
          className={classes.Btn}
          variant="contained"
          size="small"
        >
          <CreateIcon/>
          Edit
        </Button>
      </div>
      <hr className={classes.hr}/>


    </div>

  );
};

export default CompanySettingsEditor;
