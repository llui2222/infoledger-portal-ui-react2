import React, {useEffect} from 'react';
import {Box, TextField} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import BaseCompanyFields from "./BaseCompanyFields";
import {useDispatch, useSelector} from "react-redux";
import {setAllSteps} from "../../redux/actions/stepForm";

const useStyles = makeStyles((theme) => ({
    hidden: {
        display: 'none'
    }
}));

const ChildCompanyFields = ({ errors, control, register, trigger, setValue }) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const step = useSelector(state => state.stepForm.step);

    useEffect(() => {
        dispatch(setAllSteps(['Company', 'Address']));
    }, [])

    return (
        <>
            <Box className={step === 0 ? '' : classes.hidden}>
                <BaseCompanyFields control={control} errors={errors} register={register} trigger={trigger} setValue={setValue} />
            </Box>

            <Box className={step === 1 ? '' : classes.hidden}>
                <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    autoComplete="address"
                    variant="outlined"
                    type="text"
                    margin="normal"
                    inputProps={{
                        name: "address",
                        ref: register({ required: true })
                    }}
                    error={!!errors.address}
                />

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
            </Box>
        </>
    )
};

export default ChildCompanyFields;