import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
    codeField: {
        marginBottom: theme.spacing(1),
    },
}));

function MfaRequest({open, onSubmit, title}) {

    const classes = useStyles();

    const schema = yup.object().shape({
        code: yup.string().matches(/^[0-9]+$/, "Should be as 6-digit number").min(6, "Should be as 6-digit number").max(6, "Should be as 6-digit number").required(),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const handleConfirm = data => {
        onSubmit(data.code);
    }

    return (
        <Dialog open={open} maxWidth='xs'>

            <FormControl
                component="form"
                onSubmit={handleSubmit(handleConfirm)}
            >
                <DialogTitle>
                    {title}
                </DialogTitle>

                <DialogContent dividers>
                    <TextField
                        label="6-digit Authenticator Code"
                        variant="outlined"
                        className={classes.codeField}
                        autoFocus
                        inputProps={{
                            ...register("code")
                        }}
                        error={!!errors.code}
                        helperText={errors.code && errors.code.message}
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        type='submit'
                    >
                        Verify
                    </Button>
                </DialogActions>
            </FormControl>
        </Dialog>
    );
}

export default MfaRequest;
