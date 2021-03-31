import React, {useEffect} from "react";
import Typography from '@material-ui/core/Typography';
import {
    Button,
    FormControl,
    TextField,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import {updateUserAttributes} from "../../redux/actions/user";
import {useDispatch} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import EmailConfirmedMessage from "../common/EmailConfirmedMessage";
import {useForm} from "react-hook-form";
import {currentAuthenticatedUser} from "../../redux/api/auth";
import PageContainer from "../PageContainer";

const useStyles = makeStyles((theme) => ({
    form: {
        margin: 'auto'
    },
    submitButton: {
        margin: `${theme.spacing(1)}px 0 0 auto`
    }
}));

function CompanyCreate() {

    const dispatch = useDispatch();
    const classes = useStyles();

    const { register, handleSubmit, errors, setValue } = useForm({
        mode: 'onChange'
    });

    useEffect(() => {

        currentAuthenticatedUser().then(user => {
            if(user.attributes) {
                user.attributes.given_name && setValue('firstName', user.attributes.given_name, { shouldValidate: true });
                user.attributes.family_name && setValue('lastName', user.attributes.family_name, { shouldValidate: true });
                user.attributes.address && setValue('address', user.attributes.address, { shouldValidate: true });
                user.attributes['custom:company_name'] && setValue('companyName', user.attributes['custom:company_name'], { shouldValidate: true });
            }
        })
    }, [])

    const onSubmit = data => {
        dispatch(updateUserAttributes(
            data.firstName,
            data.lastName,
            data.address,
            data.companyName,
        ));
    }

    return (
        <PageContainer>

            <EmailConfirmedMessage/>

            <FormControl
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                className={classes.form}
            >
                <Typography variant="h3" gutterBottom>
                    Create Company
                </Typography>

                <TextField
                    required
                    defaultValue=''
                    fullWidth
                    id="profile-name"
                    label="Company Name"
                    autoComplete="profile-name"
                    variant="outlined"
                    type="text"
                    margin="normal"
                    inputProps={{
                        name: "profileName",
                        ref: register({ required: true })
                    }}
                    error={!!errors.profileName}
                />

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="profile-type-label">Type</InputLabel>
                    <Select
                        labelId="profile-type-label"
                        id="profile-type"
                        label="Type"
                    >
                        <MenuItem value='ORGANIZATION'>Organization</MenuItem>
                        <MenuItem value='CLIENT'>Client</MenuItem>
                        <MenuItem value='ACCOUNT'>Account</MenuItem>
                        <MenuItem value='INDIVIDUAL_INVESTOR'>Individual Investor</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    required
                    defaultValue=''
                    fullWidth
                    id="address"
                    label="Address"
                    autoComplete="address"
                    variant="outlined"
                    type="number"
                    margin="normal"
                    inputProps={{
                        name: "address",
                        ref: register({ required: true })
                    }}
                    error={!!errors.address}
                />

                <TextField
                    required
                    defaultValue=''
                    fullWidth
                    id="postal-code"
                    label="Postal Code"
                    autoComplete="postal-code"
                    variant="outlined"
                    type="text"
                    margin="normal"
                    inputProps={{
                        name: "postalCode",
                        ref: register({ required: true })
                    }}
                    error={!!errors.lastName}
                />

                <TextField
                    required
                    defaultValue=''
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
                    defaultValue=''
                    fullWidth
                    id="company-name"
                    label="Company Name"
                    autoComplete="company-name"
                    variant="outlined"
                    type="text"
                    margin="normal"
                    inputProps={{
                        name: "companyName",
                        ref: register({ required: true })
                    }}
                    error={!!errors.companyName}
                />

                <Button
                    className={classes.submitButton}
                    variant="contained"
                    size="large"
                    color="primary"
                    disableElevation
                    type="submit"
                    name="save"
                >
                    Create Company
                </Button>

            </FormControl>
        </PageContainer>
    );
}

export default CompanyCreate;
