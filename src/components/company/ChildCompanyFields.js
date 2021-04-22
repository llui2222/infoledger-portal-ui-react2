import React from 'react';
import {Box, TextField, Grid, InputLabel, Select, MenuItem, FormControl} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {Controller} from "react-hook-form";
import countries from "../../data/countries";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
    hidden: {
        display: 'none'
    },
    postalCodeField: {
        paddingLeft: theme.spacing(3)
    }
}));

const typesOfBusiness = [
    {
        type: 'ASSET_OWNER',
        label: 'Asset Owner'
    },
    {
        type: 'SERVICE_COMPANY',
        label: 'Service Company'
    }
];

const currencies = [
    'USD', 'EUR', 'CAD', 'MXN'
];

const ChildCompanyFields = ({ errors, control, register }) => {

    const classes = useStyles();
    const step = useSelector(state => state.stepForm.step);

    return (
        <>
            <Box className={step === 0 ? '' : classes.hidden}>
                <TextField
                    required
                    fullWidth
                    id="profile-name"
                    label="Company Name"
                    autoComplete="profile-name"
                    variant="outlined"
                    type="text"
                    margin="normal"
                    inputProps={{
                        name: "companyName",
                        ref: register({
                            required: true
                        })
                    }}
                    error={!!errors.companyName}
                />

                <Grid container spacing={0}>
                    <Grid item xs={12} sm={9}>
                        <FormControl
                            variant="outlined"
                            margin="normal"
                            error={!!errors.typeOfBusiness}
                            fullWidth
                            required
                        >
                            <InputLabel id="type-of-business-label">Type of Business</InputLabel>

                            <Controller
                                control={control}
                                name="typeOfBusiness"
                                type="select"
                                rules={{ required: true }}
                                as={<Select
                                    required
                                    labelId="type-of-business-label"
                                    id="type-of-business"
                                    label="Type of Business"
                                    inputProps={{
                                        name: "companyType"
                                    }}
                                >
                                    {typesOfBusiness.map(type =>
                                        <MenuItem key={type.type} value={type.type}>{type.label}</MenuItem>
                                    )}
                                </Select>
                                }
                            />

                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item xs={12} sm={6}>
                        <FormControl
                            variant="outlined"
                            margin="normal"
                            error={!!errors.baseCurrency}
                            fullWidth
                            required
                        >
                            <InputLabel id="base-currency-label">Base Currency</InputLabel>

                            <Controller
                                control={control}
                                name="baseCurrency"
                                type="select"
                                rules={{ required: true }}
                                as={<Select
                                    required
                                    labelId="base-currency-label"
                                    id="base-currency"
                                    label="Base Currency"
                                    inputProps={{
                                        name: "baseCurrency"
                                    }}
                                >
                                    {currencies.map(currency =>
                                        <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                                    )}
                                </Select>
                                }
                            />

                        </FormControl>
                    </Grid>
                </Grid>

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
            </Box>

            <Box className={step === 1 ? '' : classes.hidden}>
                <TextField
                    required
                    fullWidth
                    id="street1"
                    label="Street 1"
                    autoComplete="address-line1"
                    variant="outlined"
                    type="text"
                    margin="normal"
                    inputProps={{
                        name: "street1",
                        ref: register({ required: true })
                    }}
                    error={!!errors.street1}
                />
                <TextField
                    fullWidth
                    id="street2"
                    label="Street 2 (Optional)"
                    autoComplete="address-line2"
                    variant="outlined"
                    type="text"
                    margin="normal"
                    inputProps={{
                        name: "street2",
                        ref: register()
                    }}
                    error={!!errors.street2}
                />

                <Grid container spacing={0}>
                    <Grid item xs={6} sm={7}>
                        <TextField
                            required
                            fullWidth
                            id="city"
                            label="City"
                            autoComplete="address-level2"
                            variant="outlined"
                            type="text"
                            margin="normal"
                            inputProps={{
                                name: "city",
                                ref: register({ required: true })
                            }}
                            error={!!errors.city}
                        />
                    </Grid>
                    <Grid item xs={6} sm={5} className={classes.postalCodeField}>
                        <TextField
                            required
                            fullWidth
                            id="postal-code"
                            label="Postal Code"
                            autoComplete="postal-code"
                            variant="outlined"
                            type="number"
                            margin="normal"
                            inputProps={{
                                name: "postalCode",
                                ref: register({ required: true })
                            }}
                            error={!!errors.postalCode}
                        />
                    </Grid>
                    <Grid item xs={6} sm={7}>
                        <TextField
                            required
                            fullWidth
                            id="phone"
                            label="Phone Number"
                            autoComplete="tel"
                            variant="outlined"
                            type="text"
                            margin="normal"
                            inputProps={{
                                name: "phone",
                                ref: register({
                                    required: true,
                                    minLength: 6,
                                    maxLength: 12,
                                    pattern: /[\d+()-]/i
                                })
                            }}
                            error={!!errors.phone}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
};

export default ChildCompanyFields;