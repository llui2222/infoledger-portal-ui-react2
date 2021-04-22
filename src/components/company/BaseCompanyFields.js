import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, TextField, Grid} from '@material-ui/core';
import {Controller} from "react-hook-form";
import countries from "../../data/countries";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {useSelector} from "react-redux";

const accountTypes = [
    {
        type: 'ORGANIZATION',
        label: 'Asset Owner Organization'
    },
    {
        type: 'INDIVIDUAL_INVESTOR',
        label: 'Individual Investor'
    },
    {
        type: 'SERVICE_COMPANY',
        label: 'Service Company'
    }
];

const currencies = [
    'USD', 'EUR', 'CAD', 'MXN'
];

const BaseCompanyFields = ({ errors, control, register }) => {

    const rootCompany = useSelector(state => state.companies.rootCompany);

    return (
        <>
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

            { !rootCompany &&
                <FormControl
                    variant="outlined"
                    margin="normal"
                    error={!!errors.accountType}
                    fullWidth
                    required
                >
                    <InputLabel id="account-type-label">Account Type</InputLabel>

                    <Controller
                        control={control}
                        name="accountType"
                        type="select"
                        rules={{ required: true }}
                        as={<Select
                            required
                            labelId="account-type-label"
                            id="account-type"
                            label="Account Type"
                            inputProps={{
                                name: "accountType"
                            }}
                        >
                            {accountTypes.map( accountType =>
                                <MenuItem value={accountType.type} key={accountType.type}>
                                    {accountType.label}
                                </MenuItem>
                            )}
                        </Select>
                        }
                    />

                </FormControl>
            }

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
        </>
    )
}

export default BaseCompanyFields;