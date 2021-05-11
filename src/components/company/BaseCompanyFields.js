import React from 'react';
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
                    ...register("companyName", { required: true })
                }}
                InputLabelProps={{
                    role: "label"
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
                <InputLabel id="account-type-label" role='label'>Account Type</InputLabel>

                <Controller
                    control={control}
                    name="accountType"
                    type="select"
                    rules={{ required: true }}
                    render={({ field }) => (
                        <>
                            <Select
                                required
                                labelId="account-type-label"
                                id="account-type"
                                label="Account Type"
                                inputProps={{
                                    name: "accountType",
                                    onChange: handleAccountTypeChange
                                }}
                                {...field}
                            >
                                {accountTypes.map( accountType =>
                                    <MenuItem value={accountType.type} key={accountType.type}>
                                        {accountType.label}
                                    </MenuItem>
                                )}
                            </Select>
                        </>
                    )}
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
                            validate: value => {
                                return value.code !== defaultCurrency.code;
                            }
                        }}

                        render={({ field: { onChange }, formState: { errors } }) => (
                            <Autocomplete
                                disableClearable
                                options={[defaultCurrency, ...currencyOptions]}
                                getOptionLabel={option => option.code}
                                renderOption={option => option.code}
                                getOptionSelected={(option, value) => option.code === value.code}
                                onChange={(e, data) => onChange(data)}
                                data-testid="currency-autocomplete"
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        error={!!errors.baseCurrency}
                                        margin="normal"
                                        label="Base Currency"
                                        variant="outlined"
                                        InputLabelProps={{
                                            role: "label"
                                        }}
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
                    validate: value => value.name !== countries[0].name
                }}
                render={({ field: { onChange }, formState: { errors } }) => (
                    <Autocomplete
                        disableClearable
                        options={countries}
                        getOptionLabel={option => option.name}
                        renderOption={option => option.name}
                        onChange={(e, data) => onChange(data)}
                        data-testid="country-autocomplete"
                        renderInput={params => (
                            <TextField
                                {...params}
                                error={!!errors.country}
                                margin="normal"
                                label="Country"
                                variant="outlined"
                                autoComplete='new-password'
                                InputLabelProps={{
                                    role: "label"
                                }}
                            />
                        )}
                    />
                )}
            />
        </>
    )
}

export default BaseCompanyFields;