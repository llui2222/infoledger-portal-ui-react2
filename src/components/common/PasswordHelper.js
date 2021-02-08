import React, { useState } from 'react';
import {
    Fade,
    Paper,
    Popper
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import {
    CheckCircle,
    RadioButtonUnchecked
} from '@material-ui/icons';
import FieldPassword from "./FieldPassword";

const useStyles = makeStyles((theme) => ({
    passwordPopper: {
        padding: `1px ${theme.spacing(2)}px`,
        margin: `0 ${theme.spacing(2)}px`,
        '&>ul': {
            padding: 0,
            listStyle: 'none',
            '&>li': {
                display: 'flex',
                alignItems: 'center',
                '&>svg': {
                    paddingRight: theme.spacing(0.5)
                }
            }
        }
    },
    done: {
        color: theme.palette.secondary.secondary
    }
}));

const allowedSpecialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const initialPasswordRequirements = [
    'minLength',
    'hasLowerCase',
    'hasUpperCase',
    'hasSpecialChar',
    'hasNumber',
];

function PasswordHelper({ fieldProps, controlProps, name, register, ...restProps }) {

    const classes = useStyles();
    const [passwordReq, setPasswordReq] = useState(initialPasswordRequirements);
    const [inputAnchor, setInputAnchor] = useState(null);

    function passwordValidate(value) {

        let passReq = initialPasswordRequirements;

        if(value.length >= 8) {
            passReq = passReq.filter(item => item !== 'minLength');
        }
        if(hasLowerCase(value)) {
            passReq = passReq.filter(item => item !== 'hasLowerCase');
        }
        if(hasUpperCase(value)) {
            passReq = passReq.filter(item => item !== 'hasUpperCase');
        }
        if(allowedSpecialCharacters.test(value)) {
            passReq = passReq.filter(item => item !== 'hasSpecialChar');
        }
        if(/\d/.test(value)) {
            passReq = passReq.filter(item => item !== 'hasNumber');
        }

        setPasswordReq(passReq);
        return passReq.length === 0;
    }

    function DrawPopoverLine({type, children}) {
        return(
            <li className={!passwordReq.includes(type) ? classes.done : ''}>
                {passwordReq.includes(type) ?
                    <RadioButtonUnchecked fontSize="small"/> :
                    <CheckCircle fontSize="small"/>
                } {children}
            </li>
        )
    }

    return (
        <>
            <FieldPassword
                name={name}
                onFocus={e => setInputAnchor(e.currentTarget)}
                onBlur={() => setInputAnchor(null)}
                inputProps={{
                    name: name,
                    ref: register( {
                        validate: {
                            passwordValidate
                        }
                    })
                }}
                {...restProps}
            />
            <Popper
                open={!!inputAnchor}
                anchorEl={inputAnchor}
                placement='right'
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper className={classes.passwordPopper}>
                        <h4>Your password should contain: </h4>
                        <ul>
                            <DrawPopoverLine type='minLength'>Minimum length of 8 characters</DrawPopoverLine>
                            <DrawPopoverLine type='hasNumber'>Numerical characters (0-9)</DrawPopoverLine>
                            <DrawPopoverLine type='hasSpecialChar'>Special characters</DrawPopoverLine>
                            <DrawPopoverLine type='hasUpperCase'>Uppercase letter</DrawPopoverLine>
                            <DrawPopoverLine type='hasLowerCase'>Lowercase letter</DrawPopoverLine>
                        </ul>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </>
    );
}

export default PasswordHelper;

function hasLowerCase(value) {
    return value.toUpperCase() !== value;
}

function hasUpperCase(value) {
    return value.toLowerCase() !== value;
}