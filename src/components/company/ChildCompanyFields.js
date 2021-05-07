import React, {useEffect} from 'react';
import {Box, TextField, Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import BaseCompanyFields from "./BaseCompanyFields";

const useStyles = makeStyles((theme) => ({
    hidden: {
        display: 'none'
    },
    postalCodeField: {
        paddingLeft: theme.spacing(3)
    }
}));

const ChildCompanyFields = ({ errors, control, register, showCurrency, setShowCurrency }) => {

    const classes = useStyles();
    const step = useSelector(state => state.stepForm.step);

    useEffect(() => {
        setShowCurrency(true);
    }, [])

    return (
        <>
            <Box className={step === 0 ? '' : classes.hidden}>
                <BaseCompanyFields
                    errors={errors}
                    control={control}
                    register={register}
                    showCurrency={showCurrency}
                    setShowCurrency={setShowCurrency}
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
                        ...register("street1", { required: true })
                    }}
                    InputLabelProps={{
                        role: "label"
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
                        ...register("street2")
                    }}
                    InputLabelProps={{
                        role: "label"
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
                                ...register("city", { required: true })
                            }}
                            InputLabelProps={{
                                role: "label"
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
                                ...register("postalCode", { required: true })
                            }}
                            InputLabelProps={{
                                role: "label"
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
                                ...register("phone", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /[\d+()-]/i
                                })
                            }}
                            InputLabelProps={{
                                role: "label"
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