import React, {useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, TextField, Grid} from '@material-ui/core';
import {Controller} from "react-hook-form";
import countries from "../../data/countries";
import currencies from "../../data/currencies";
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

const BaseCompanyFields = ({ errors, control, register, showCurrency, setShowCurrency }) => {

    const rootCompany = useSelector(state => state.companies.rootCompany);
    const currencyOptions = Object.entries(currencies).map(currency => ({
        code: currency[0],
        name: currency[1]
    }));

    const defaultCurrency = {code: '',name: ''};

    const handleAccountTypeChange = e => {

        const accountType = e.target.value;

        if(accountType && accountType === "SERVICE_COMPANY") {
            setShowCurrency(false)
        } else {
            setShowCurrency(true)
        }
    }

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
                                name: "accountType",
                                onChange: handleAccountTypeChange
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

            { showCurrency &&
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>
                </Grid>
            }

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
        </>
    )
}

export default BaseCompanyFields;