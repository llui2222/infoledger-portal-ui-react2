import React, {useState, useEffect, useLayoutEffect, useMemo, useRef} from "react";
import CompanyBusinessAddress from './CompanyBusinessAddress';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import {Box, Chip, Grid, InputAdornment, TextField} from "@material-ui/core";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import Typography from "@material-ui/core/Typography";
import {useLocation, useHistory} from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Controller, useForm} from "react-hook-form";
import countries from "../../data/countries";
import {useSelector} from "react-redux";
import {gql, useMutation} from "@apollo/client";
import {updateProfile} from "../../graphql/mutations";
import BorderColorIcon from "@material-ui/icons/BorderColor";

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
  InfoLedgerId: {
    width: '90%',
  },
  companyTitle: {
    display: 'flex',
  },
  companyTitleEdit: {
    marginTop: '10px',
  },
  companyTitleEditInput: {
    marginTop: '30px',
  },
  companyName: {
    margin: '0 20px 30px 0',
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

  btnGroup: {
    marginTop: '10px',
  },
  addressLabel: {
    margin: 0,
  }
}));

const CompanySettingsEditor = ({company}) => {
  const dataCompanies = useSelector(state => state?.companies);
  const rootCompany = useSelector(state => state?.companies.rootCompany);
  const history = useHistory();
  const classes = useStyles();
  const {pathname} = useLocation();
  const ref = useRef(null);
  const [timeDisabled, setTimeDisabled] = useState(true);
  const [updateCompany] = useMutation(gql(updateProfile));

  const {
    errors,
    control,
    watch,
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      companyName: '',
      accountType: '',
      companyType: '',
      typeOfBusiness: '',
      country: countries[0],
      address: '',
      postalCode: '',
    },
  });

  const id = useMemo(() => {
    const paths =  pathname.split('/')
    return paths[paths.length - 1];
  }, [pathname]);

  let companyName = dataCompanies.childCompanies.find(company => company?.profileId === id)?.displayName;
  let country = dataCompanies.childCompanies.find(company => company?.profileId === id)?.businessAddress.country;
  let businessAddressObj = dataCompanies.childCompanies.find(company => company?.profileId === id)?.businessAddress;

  const [isCompanyTitleEdit, setIsCompanyTitleEdit] = useState('false');
  const [countryDisabled, setCountryDisabled] = useState(true);
  const [countryValue, setCountryValue] = useState(country);
  const [companyTitle, setCompanyTitle] = useState(companyName);
  const [newCompanyTitle, setNewCompanyTitle] = useState('');
  const [postalCode, setPostalCode] = useState(businessAddressObj?.postalCode);
  const [streetAddress, setStreetAddress] = useState(businessAddressObj?.streetAddress);
  const [city, setCity] = useState(businessAddressObj?.city);
  const [postalCodeDisabled, setPostalCodeDisabled] = useState(true);
  const [streetAddressDisabled, setStreetAddressDisabled] = useState(true);
  const [cityDisabled, setCityDisabled] = useState(true);
  const [newPostalCode, setNewPostalCode] = useState('');
  const [newStreetAddress, setNewStreetAddress] = useState('');
  const [newCity, setNewCity] = useState('');

  const IdCopyHandler = () => {
    ref.current.select();
    document.execCommand('copy');
    ref.current.blur();
  };

  const isCompanyTitleEditHandler = () => {
    setIsCompanyTitleEdit(!isCompanyTitleEdit);
  };

  const setTimeHandler = () => {
    setTimeDisabled(false);
  };

  const changeCompanyTitleHandler = (e) => {
    e.preventDefault();
    setNewCompanyTitle(e.target.value);
  };

  const saveCompanyTitle = () => {
    if (newCompanyTitle.length !== 0) {
      setCompanyTitle(newCompanyTitle);
    }
    setIsCompanyTitleEdit(!isCompanyTitleEdit);
  };

  const cancelCompanyTitleChangeHandler = () => {
    setIsCompanyTitleEdit(!isCompanyTitleEdit);
  };

  const setCountryValueHandler = () => {
    setCountryDisabled(false);
  };
  
  const  saveCountryValueHandler = () => {
    updateCompany({variables: {
        profileId: rootCompany.profileId,
        profile: {
          profileName: getValues(companyName),
          businessAddress: {
            country: watch('country').name
          }
        }
      }
    })
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
    if (newPostalCode.length !== 0) {
      setPostalCode(newPostalCode);
    }
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
    if (newStreetAddress.length !== 0) {
      setStreetAddress(newStreetAddress);
    }
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
    if (newCity.length !== 0) {
      setCity(newCity);
    }
    setCityDisabled(true);
  };

    const BusinessAddressInfo =  [
      {
        name: 'postalCode',
        title: 'Postal Code: ',
        defaultValue: postalCode,
        disabled: postalCodeDisabled,
        setFieldHandler: setPostalCodeHandler,
        changeFieldHandler: changePostalCodeHandler,
        saveFieldHandler: savePostalCodeHandler,
        cancelFieldHandler: cancelPostalCodeChangeHandler,
      },
      {
        name: 'streetAddress',
        title: 'Street: ',
        defaultValue: streetAddress,
        disabled: streetAddressDisabled,
        setFieldHandler: setStreetAddressHandler,
        changeFieldHandler: changeStreetAddressHandler,
        saveFieldHandler: saveStreetAddressHandler,
        cancelFieldHandler: cancelStreetAddressChangeHandler,
      },
      {
        name: 'city',
        title: 'City: ',
        defaultValue: city,
        disabled: cityDisabled,
        setFieldHandler: setCityHandler,
        changeFieldHandler: changeCityHandler,
        saveFieldHandler: saveCityHandler,
        cancelFieldHandler: cancelCityChangeHandler,
      },
    ];

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
        isCompanyTitleEdit ? (
          <Box className={classes.companyTitle}>
            <Typography variant="h4" className={classes.companyName}>{companyTitle}</Typography>
            <BorderColorIcon className={classes.companyTitleEdit} onClick={isCompanyTitleEditHandler}/>
          </Box>
        ) : (
          <Box>
            <TextField
              className={classes.companyTitleEditInput}
              defaultValue={companyTitle}
              onChange={changeCompanyTitleHandler}
              autoFocus
            />
            <Box className={classes.btnGroup}>
              <Button
                className={classes.Btn}
                variant="contained"
                size="small"
                onClick={saveCompanyTitle}
              >
                <SaveIcon/>
                Save
              </Button>
              <Button
                className={classes.Btn}
                variant="contained"
                size="small"
                onClick={cancelCompanyTitleChangeHandler}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )
      }

      {/*//================= Copy Id ============*/}
      <Box   className={classes.messages}>
       <Box>
         <Typography>InfoLedger Id</Typography>
         <input
           className={classes.companyIdInput}
           ref={ref} value={id}

           onChange={() => {}}
         />
       </Box>
          <Button
            className={classes.Btn}
            variant="contained"
            size="small"
            onClick={IdCopyHandler}
          >
            <FileCopyIcon/>
            Copy
          </Button>
      </Box>
      <hr className={classes.hr}/>
      {/*//========================================*/}

      {/*//=================== Users ==============*/}
      <Box   className={classes.messages}>
        <Typography className={classes.TextMessages}>
          Outgoing regular messages
        </Typography>
        <Chip label="1" style={{marginTop: '-5px'}}/>
        <KeyboardArrowRightIcon className={classes.rightArrow}/>
      </Box>
      <hr className={classes.hr}/>

      <Box   className={classes.messages}>
        <Typography className={classes.TextMessages}>
          Users
        </Typography>
        <Chip label="0" style={{marginTop: '-5px'}}/>
        <KeyboardArrowRightIcon className={classes.rightArrow}/>
      </Box>
      <hr className={classes.hr}/>
      {/*//========================================*/}

      {/*//================= Time =================*/}
      <Box   className={classes.messages}>
        <Box>
          <Typography className={classes.TextMessages}>
            Sending time
          </Typography>
          {!timeDisabled ? <input  className={classes.timeInput} type="time"/> : null}
        </Box>

        <Button
          className={classes.Btn}
          variant="contained"
          size="small"
          onClick={setTimeHandler}
        >
          Set time
        </Button>
      </Box>
      <hr className={classes.hr}/>
      {/*//==============================================*/}

{/*//============== Country ========================*/}
      <Box>
          <Typography>
            Country
          </Typography>
        {
          countryDisabled && (
            <Box   className={classes.messages}>
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
            </Box>
          )
        }
        {
          !countryDisabled && (
            <Box>
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
            </Box>
          )
        }
      </Box>
      <hr className={classes.hr}/>
{/*//================================================*/}

{/*//================= Business address ==============*/}
      <Box>
          <Typography>
            Business address
          </Typography>
        {
          BusinessAddressInfo.map(({
            name,
            title,
            defaultValue,
            disabled,
            setFieldHandler,
            changeFieldHandler,
            saveFieldHandler,
            cancelFieldHandler
          }) => (
            <CompanyBusinessAddress
              key={name}
              name={name}
              title={title}
              defaultValue={defaultValue}
              disabled={disabled}
              setFieldHandler={setFieldHandler}
              changeFieldHandler={changeFieldHandler}
              saveFieldHandler={saveFieldHandler}
              cancelFieldHandler={cancelFieldHandler}
            />
          ))
        }
      </Box>
        <hr className={classes.hr}/>
    </div>
  );
};

export default CompanySettingsEditor;
