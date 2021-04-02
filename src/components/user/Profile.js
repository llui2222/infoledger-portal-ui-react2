import React, {useEffect} from "react";
import Typography from '@material-ui/core/Typography';
import {Button, FormControl, TextField} from "@material-ui/core";
import {updateUserAttributes} from "../../redux/actions/user";
import {useDispatch} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import EmailConfirmedMessage from "../common/EmailConfirmedMessage";
import {useForm} from "react-hook-form";
import CenteredContainer from "../common/containers/CenteredContainer";
import {currentAuthenticatedUser} from "../../redux/api/auth";

const useStyles = makeStyles((theme) => ({
    form: {
        margin: 'auto'
    },
    submitButton: {
        margin: `${theme.spacing(1)}px 0 0 auto`
    }
}));

function Profile() {

    const dispatch = useDispatch();
    const classes = useStyles();

    const { register, handleSubmit, errors, setValue } = useForm({
        mode: 'onChange'
    });

    useEffect(() => {

        currentAuthenticatedUser().then(user => {
            if(user.attributes) {
                user.attributes.name && setValue('firstName', user.attributes.name, { shouldValidate: true });
                user.attributes.family_name && setValue('lastName', user.attributes.family_name, { shouldValidate: true });
                user.attributes.address && setValue('address', user.attributes.address, { shouldValidate: true });
            }
        })
    }, [])

    const onSubmit = data => {
        dispatch(updateUserAttributes(
            data.firstName,
            data.lastName,
            data.address,
        ));
    }

    return (
        <CenteredContainer>

            <EmailConfirmedMessage/>

            <FormControl
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                className={classes.form}
            >
                <Typography variant="h3" gutterBottom>
                    Profile
                </Typography>

                <TextField
                    required
                    defaultValue=''
                    fullWidth
                    id="first-name"
                    label="First Name"
                    autoComplete="first-name"
                    variant="outlined"
                    type="text"
                    margin="normal"
                    inputProps={{
                        name: "firstName",
                        ref: register({ required: true })
                    }}
                    error={!!errors.firstName}
                />

                <TextField
                    required
                    defaultValue=''
                    fullWidth
                    id="last-name"
                    label="Last Name"
                    autoComplete="last-name"
                    variant="outlined"
                    type="text"
                    margin="normal"
                    inputProps={{
                        name: "lastName",
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

                <Button
                    className={classes.submitButton}
                    variant="contained"
                    size="large"
                    color="primary"
                    disableElevation
                    type="submit"
                    name="save"
                >
                    Save
                </Button>

            </FormControl>
        </CenteredContainer>
    );
}

export default Profile;
