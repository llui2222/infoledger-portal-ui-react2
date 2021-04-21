import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, TextField} from '@material-ui/core';
import {Controller} from "react-hook-form";
import countries from "../../data/countries";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {useDispatch, useSelector} from "react-redux";
import {nextStep, setAllSteps} from "../../redux/actions/stepForm";

const companyTypes = [
    {
        type: 'ORGANIZATION',
        label: 'Organization'
    },
    {
        type: 'INDIVIDUAL_INVESTOR',
        label: 'Individual Investor'
    }
];

const BaseCompanyFields = ({ errors, control, register, trigger, setValue }) => {

    const dispatch = useDispatch();
    const next = useSelector(state => state.stepForm.next);
    const [typeOfBusinessDisabled, setTypeOfBusinessDisabled] = useState(false);

    const handleCompanyTypeChange = e => {

        const companyType = e.target.value;

        if(companyType && companyType === "INDIVIDUAL_INVESTOR") {
            setValue('typeOfBusiness', 'ASSET_OWNER');
            setTypeOfBusinessDisabled(true)
        } else {
            setTypeOfBusinessDisabled(false)
            setValue('typeOfBusiness', '');
        }
    }

    useEffect(() => {
        dispatch(setAllSteps(['Company']));
    }, [])

    useEffect(() => {
        if(next > 0) {
            trigger(["companyName", "companyType", "typeOfBusiness", "country" ]).then(valid => {
                if(valid) {
                    dispatch(nextStep());
                }
            })
        }
    }, [next]);

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

            <FormControl
                variant="outlined"
                margin="normal"
                error={!!errors.companyType}
                fullWidth
                required
            >
                <InputLabel id="profile-type-label">Company Type</InputLabel>

                <Controller
                    control={control}
                    name="companyType"
                    type="select"
                    rules={{ required: true }}
                    as={<Select
                        required
                        labelId="profile-type-label"
                        id="profile-type"
                        label="Company Type"
                        inputProps={{
                            name: "companyType",
                            onChange: handleCompanyTypeChange
                        }}
                    >
                        {companyTypes.map( companyType =>
                            <MenuItem value={companyType.type} key={companyType.type}>
                                {companyType.label}
                            </MenuItem>
                        )}
                    </Select>
                    }
                />

            </FormControl>

            <FormControl
                variant="outlined"
                margin="normal"
                error={!!errors.typeOfBusiness}
                fullWidth
                required
                disabled={typeOfBusinessDisabled}
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
                        <MenuItem value='ASSET_OWNER'>Asset Owner</MenuItem>
                        <MenuItem value='SERVICE_COMPANY'>Service Company</MenuItem>
                    </Select>
                    }
                />

            </FormControl>

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
};

export default BaseCompanyFields;