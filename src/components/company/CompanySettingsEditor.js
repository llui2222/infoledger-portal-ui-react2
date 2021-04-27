import React, {useState, useEffect, useLayoutEffect, useMemo, useRef} from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import {Chip, InputAdornment, TextField} from "@material-ui/core";
import WarningIcon from '@material-ui/icons/Warning';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import Typography from "@material-ui/core/Typography";
import {useLocation} from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Controller, useForm} from "react-hook-form";
import currencies from "../../data/currencies";
import countries from "../../data/countries";
import {useSelector} from "react-redux";
import {gql, useMutation} from "@apollo/client";
import {saveProfile} from "../../graphql/mutations";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    marginLeft: '10%',
    marginRight: '5%',
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
    marginRight: '20px',
  },
  currency: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  timeInput: {
    outline: 'none',
    border: 'none',
    background: '#fafafa',
  },
  input: {
    outline: 'none',
    border: 'none',
    background: '#fafafa',
    color: 'black',
  },
  currencyInputContainer: {
    width: '500px',
    display: 'flex,'
  },
  baseCurrencyInput: {
   width: '30%',
  },
  countryInput: {
    width: '90%',
  },
  businessInputs: {
    display: 'flex',
    flexDirection: 'column',
  },
  BtnGroup: {
    marginTop: '10px',
  }
}));

const CompanySettingsEditor = ({company}) => {
  const dataCompanies = useSelector(state => state?.companies);
  const classes = useStyles();
  const {pathname} = useLocation();
  const ref = useRef(null);
  const [timeDisabled, setTimeDisabled] = useState(true);


  // console.log(`==========>dataCompanies`, dataCompanies)

  const currencyOptions = Object.entries(currencies).map(currency => ({
    code: currency[0],
    name: currency[1]
  }));

  const defaultCurrency = {code: '',name: ''};

  const {
    errors,
    control,
    watch,
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
    },
  });
// console.log(`==========>watch('country)`, watch('country'))
  const id = useMemo(() => {
    const paths =  pathname.split('/')
    return paths[paths.length - 1];
  }, [pathname]);


  let currency =  dataCompanies.childCompanies.find(company => company?.profileId === id)?.currency.match(/(?<=code=).*(?=,)/);
  // console.log(`==========>currency`, currency)
  const [currencyDisabled, setCurrencyDisabled] = useState(true);
  const [currencyValue, setCurrencyValue] = useState(currency);
  const [countryDisabled, setCountryDisabled] = useState(true);
  let country = dataCompanies.childCompanies.find(company => company?.profileId === id)?.businessAddress.country;
  const [countryValue, setCountryValue] = useState(country);

  let businessAddressObj = dataCompanies.childCompanies.find(company => company?.profileId === id)?.businessAddress;
  let businessAddressArr = Object.values(businessAddressObj);
  console.log(`==========>businessAddressArr`, businessAddressObj);
  const [postalCode, setPostalCode] = useState(businessAddressObj.postalCode);
  const [streetAddress, setStreetAddress] = useState(businessAddressObj.streetAddress);
  const [city, setCity] = useState(businessAddressObj.city);
  const [addressDisabled, setAddressDisabled] = useState(true);
  const [autofocus, setAutofocus] = useState(false);

  // ["Address", "Russia", "Chechkova ", "Taganrog", "347900", "8-800-000-00-00"]


  console.log(`==========>businessAddress`, businessAddressObj)
  const [businessAddressValue, setBusinessAddressValue] = useState('not specified');


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

  const  saveCurrencyValueHandler = () => {
    setCurrencyValue(watch('baseCurrency').code);
    setCurrencyDisabled(true);
  };

  const cancelCurrencyChangeHandler = () => {
    setCurrencyDisabled(true);
  }

  const setCountryHandler = () => {
    setCountryDisabled(false);
  };

  const  saveCountryValueHandler = () => {
    setCountryValue(watch('country').name);
    setCountryDisabled(true);
  };

  const cancelCountryChangeHandler = () => {
    setCountryDisabled(true);
  };

  const setAddressHandler = () => {
    setAddressDisabled(false);
    setAutofocus(true);
  };

  const cancelAddressChangeHandler = () => {
    setAddressDisabled(true);
    setPostalCode(postalCode);
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
        <div>
          <Typography className={classes.currency}>
            About
          </Typography>
          <Typography>
            Currency
          </Typography>
          {
            currencyDisabled &&
              <div   className={classes.messages}>
                  <input
                  className={classes.input}
                  type="text"
                  disabled
                  defaultValue={currencyValue}
                  />
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
          }
          {
            !currencyDisabled && (
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
                      className={classes.baseCurrencyInput}
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
                <Button
                  className={classes.Btn}
                  variant="contained"
                  size="small"
                  onClick={saveCurrencyValueHandler}
                >
                  <SaveIcon/>
                  Save
                </Button>
                <Button
                  className={classes.Btn}
                  variant="contained"
                  size="small"
                  onClick={cancelCurrencyChangeHandler}
                >
                  Cancel
                </Button>
              </div>
            )
          }
        </div>
      <hr className={classes.hr}/>
{/*//================================================*/}

{/*//============== Country ========================*/}
      <div>
          <Typography>
            Country
          </Typography>
        {
          countryDisabled ?
            <div   className={classes.messages}>
              <input
                className={classes.input}
                type="text"
                value={countryValue}
                disabled
              />
              <Button
                className={classes.Btn}
                variant="contained"
                size="small"
                onClick={setCountryHandler}
              >
                <CreateIcon/>
                Edit
              </Button>
            </div>
            : null
        }
        {
          !countryDisabled ? (
            <div>
              <Controller
                onChange={([, data]) => data}
                defaultValue={countries[0]}
                name="country"
                control={control}
                rules={{
                  required: true,
                  validate: value => value !== countries[0]
                }}
                render={({ onChange, ...props }) => (
                  <Autocomplete
                    className={classes.countryInput}
                    disableClearable
                    options={countries}
                    getOptionLabel={option => option.name}
                    renderOption={option => option.name}
                    onChange={(e, data) => onChange(data)}
                    {...props}
                    renderInput={params => (
                      <TextField
                        {...params}
                        error={!!errors.country}
                        margin="normal"
                        label="Country"
                        variant="outlined"
                        autoComplete='new-password'
                      />
                    )}
                  />
                )}
              />
              <Button
                className={classes.Btn}
                variant="contained"
                size="small"
                onClick={saveCountryValueHandler}
              >
                <SaveIcon/>
                Save
              </Button>
              <Button
                className={classes.Btn}
                variant="contained"
                size="small"
                onClick={cancelCountryChangeHandler}
              >
                Cancel
              </Button>
            </div>

          ) : null
        }
      </div>
      <hr className={classes.hr}/>
{/*//================================================*/}

{/*//================= Business address ==============*/}
      <div>

          <Typography>
            Business address
          </Typography>

            <div   className={classes.messages}>
              <div className={classes.businessInputs}>
                  <label htmlFor="postalCode">Postal Code:</label>
                  <input
                    id="postalCode"
                    className={classes.addressInput}
                    type="text"
                    defaultValue={postalCode}
                    disabled={addressDisabled}
                    // autoFocus={autofocus}
                  />
                <label htmlFor="street">Street:</label>
                <input
                  id="street"
                  className={classes.addressInput}
                  type="text"
                  defaultValue={streetAddress}
                  disabled={addressDisabled}
                />
                <label htmlFor="city">City:</label>
                <input
                  id="city"
                  className={classes.addressInput}
                  type="text"
                  defaultValue={city}
                  disabled={addressDisabled}
                />
                <label htmlFor="country">Country:</label>
                <input
                  id="country"
                  className={classes.addressInput}
                  type="text"
                  defaultValue={countryValue}
                  disabled={addressDisabled}
                />
                {! addressDisabled && (
                  <div  className={classes.BtnGroup}>
                    <Button
                      className={classes.Btn}
                      variant="contained"
                      size="small"
                      // onClick={saveAddressHandler}
                    >
                      <SaveIcon/>
                      Save
                    </Button>
                    <Button
                      className={classes.Btn}
                      variant="contained"
                      size="small"
                      onClick={cancelAddressChangeHandler}
                    >
                      Cancel
                    </Button>
                  </div>
                )
                }
              </div>
              { addressDisabled && (
                <Button
                  className={classes.Btn}
                  variant="contained"
                  size="small"
                  onClick={setAddressHandler}
                >
                  <CreateIcon/>
                  Edit
                </Button>
                )
              }

            </div>


      </div>
      <hr className={classes.hr}/>


    </div>

  );
};

export default CompanySettingsEditor;
