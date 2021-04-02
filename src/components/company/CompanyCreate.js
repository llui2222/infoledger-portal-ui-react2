import React from "react";
import Typography from '@material-ui/core/Typography';
import {
    Button,
    FormControl,
    TextField,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import {useDispatch} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import EmailConfirmedMessage from "../common/EmailConfirmedMessage";
import {useForm, Controller} from "react-hook-form";
import CenteredContainer from "../common/containers/CenteredContainer";
import {companyCreate} from "../../redux/actions/company";
import { gql, useMutation } from '@apollo/client';
import {saveProfile} from "../../graphql/mutations";

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
    const [addCompany, { loading, error, data }] = useMutation(gql(saveProfile));

    const { register, handleSubmit, errors, setValue, control } = useForm({
        mode: 'onChange'
    });

    const handleSubmitForm = e => {
        e.preventDefault();
        handleSubmit(onSubmit);
    }

    const onSubmit = data => {

        addCompany({ variables: {
                profile: {
                    profileName: data.companyName,
                    profileType: data.companyType,
                    typeOfBusiness: data.typeOfBusiness,
                    businessAddress: {
                        streetAddress: data.address,
                        postalCode: data.postalCode,
                    },
                }
            }
        });
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
                >
                    <InputLabel id="profile-type-label">Company Type</InputLabel>

                    <Controller
                        as={<Select
                            required
                            labelId="profile-type-label"
                            id="profile-type"
                            label="Company Type"
                        >
                            <MenuItem value='ORGANIZATION'>Organization</MenuItem>
                            <MenuItem value='CLIENT'>Client</MenuItem>
                            <MenuItem value='ACCOUNT'>Account</MenuItem>
                            <MenuItem value='INDIVIDUAL_INVESTOR'>Individual Investor</MenuItem>
                        </Select>}
                        defaultValue=''
                        name="companyType"
                        type="select"
                        control={control}
                    />

                </FormControl>

                <FormControl
                    variant="outlined"
                    margin="normal"
                    error={!!errors.typeOfBusiness}
                >
                    <InputLabel id="type-of-business-label">Type of Business</InputLabel>


                    <Controller
                        as={<Select
                            required
                            labelId="type-of-business-label"
                            id="type-of-business"
                            label="Type of Business"
                        >
                            <MenuItem value='ASSET_OWNER'>Asset Owner</MenuItem>
                            <MenuItem value='SERVICE_COMPANY'>Service Company</MenuItem>
                        </Select>}
                        defaultValue=''
                        name="typeOfBusiness"
                        type="select"
                        control={control}
                    />

                </FormControl>

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
        </CenteredContainer>
    );
}

export default CompanyCreate;
