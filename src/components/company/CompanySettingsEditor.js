import React, {useState, useEffect, useLayoutEffect, useMemo, useRef} from "react";
import CompanyBusinessAddress from './CompanyBusinessAddress';
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
  businessAddressInputs: {
    display: 'flex',
    flexDirection: 'column',
  },
  Btn: {
    marginLeft: 'auto',
    marginRight: '20px',
  },
  TextMessages: {
    marginRight: '10px',
  },
  rightArrow: {
    marginLeft: 'auto',
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

  BtnGroup: {
    marginTop: '10px',
  },
  // addressInputLabel: {
  //  width: '20%',
  // },
  addressLabel: {
    margin: 0,
  }
}));

const CompanySettingsEditor = ({company}) => {
  const dataCompanies = useSelector(state => state?.companies);
  const classes = useStyles();
  const {pathname} = useLocation();
  const ref = useRef(null);
  const [timeDisabled, setTimeDisabled] = useState(true);

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

  const id = useMemo(() => {
    const paths =  pathname.split('/')
    return paths[paths.length - 1];
  }, [pathname]);

  let currency =  dataCompanies.childCompanies.find(company => company?.profileId === id)?.currency.match(/(?<=code=).*(?=,)/);
  let country = dataCompanies.childCompanies.find(company => company?.profileId === id)?.businessAddress.country;
  let businessAddressObj = dataCompanies.childCompanies.find(company => company?.profileId === id)?.businessAddress;

  const [currencyDisabled, setCurrencyDisabled] = useState(true);
  const [currencyValue, setCurrencyValue] = useState(currency);
  const [countryDisabled, setCountryDisabled] = useState(true);
  const [countryValue, setCountryValue] = useState(country);
  const [postalCode, setPostalCode] = useState(businessAddressObj.postalCode);
  const [streetAddress, setStreetAddress] = useState(businessAddressObj.streetAddress);
  const [city, setCity] = useState(businessAddressObj.city);
  const [countryName, setCountryName] = useState(businessAddressObj.country);
  const [postalCodeDisabled, setPostalCodeDisabled] = useState(true);
  const [streetAddressDisabled, setStreetAddressDisabled] = useState(true);
  const [cityDisabled, setCityDisabled] = useState(true);
  const [countryNameDisabled, setCountryNameDisabled] = useState(true);
  const [newPostalCode, setNewPostalCode] = useState('');
  const [newStreetAddress, setNewStreetAddress] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newCountryName, setNewCountryName] = useState('');

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

  const setCountryValueHandler = () => {
    setCountryDisabled(false);
  };

  const  saveCountryValueHandler = () => {
    setCountryValue(watch('country').name);
    setCountryDisabled(true);
  };

  const cancelCountryChangeHandler = () => {
    setCountryDisabled(true);
  };

  const setPostalCodeHandler = () => {
    setPostalCodeDisabled(false);
  };

  const cancelPostalCodeChangeHandler = () => {
    setPostalCode(postalCode);
    setPostalCodeDisabled(true);
  };

  const changePostalCodeHandler = (e) => {
    e.preventDefault();
    setNewPostalCode(e.target.value);
  };

  const savePostalCodeHandler = () => {
    setPostalCode(newPostalCode);
    setPostalCodeDisabled(true);
  };

  const setStreetAddressHandler = () => {
    setStreetAddressDisabled(false);
  };

  const cancelStreetAddressChangeHandler = () => {
    setStreetAddress(streetAddress);
    setStreetAddressDisabled(true);
  };

  const changeStreetAddressHandler = (e) => {
    e.preventDefault();
    setNewStreetAddress(e.target.value);
  };

  const saveStreetAddressHandler = () => {
    setStreetAddress(newStreetAddress);
    setStreetAddressDisabled(true);
  };

  const setCityHandler = () => {
    setCityDisabled(false);
  };

  const cancelCityChangeHandler = () => {
    setCity(city);
    setCityDisabled(true);
  };

  const changeCityHandler = (e) => {
    e.preventDefault();
    setNewCity(e.target.value);
  };

  const saveCityHandler = () => {
    setCity(newCity);
    setCityDisabled(true);
  };

  const setCountryNameHandler = () => {
    setCountryNameDisabled(false);
  };

  const cancelCountryNameChangeHandler = () => {
    setCountryName(countryName);
    setCountryNameDisabled(true);
  };

  const changeCountryNameHandler = (e) => {
    e.preventDefault();
    setNewCountryName(e.target.value);
  };

  const saveCountryNameHandler = () => {
    setCountryName(newCountryName);
    setCountryNameDisabled(true);
  };

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
                onClick={setCountryValueHandler}
              >
                <CreateIcon/>
                Edit
              </Button>
            </div>
            : null
        }
        {
          !countryDisabled && (
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

          )
        }
      </div>
      <hr className={classes.hr}/>
{/*//================================================*/}

{/*//================= Business address ==============*/}
      <div>
          <Typography>
            Business address
          </Typography>
          <CompanyBusinessAddress
            name="postalCode"
            title="Postal Code: "
            defaultValue={postalCode}
            disabled={postalCodeDisabled}
            setFieldHandler={setPostalCodeHandler}
            changeFieldHandler={changePostalCodeHandler}
            saveFieldHandler={savePostalCodeHandler}
            cancelFieldHandler={cancelPostalCodeChangeHandler}
          />
          <CompanyBusinessAddress
            name="streetAddress"
            title="Street: "
            defaultValue={streetAddress}
            disabled={streetAddressDisabled}
            setFieldHandler={setStreetAddressHandler}
            changeFieldHandler={changeStreetAddressHandler}
            saveFieldHandler={saveStreetAddressHandler}
            cancelFieldHandler={cancelStreetAddressChangeHandler}
          />
        <CompanyBusinessAddress
          name="city"
          title="City: "
          defaultValue={city}
          disabled={cityDisabled}
          setFieldHandler={setCityHandler}
          changeFieldHandler={changeCityHandler}
          saveFieldHandler={saveCityHandler}
          cancelFieldHandler={cancelCityChangeHandler}
        />
        <CompanyBusinessAddress
          name="country"
          title="Country: "
          defaultValue={countryName}
          disabled={countryNameDisabled}
          setFieldHandler={setCountryNameHandler}
          changeFieldHandler={changeCountryNameHandler}
          saveFieldHandler={saveCountryNameHandler}
          cancelFieldHandler={cancelCountryNameChangeHandler}
        />
      </div>
        <hr className={classes.hr}/>
    </div>
  );
};

export default CompanySettingsEditor;


