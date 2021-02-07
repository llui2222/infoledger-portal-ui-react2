import React, { useState } from 'react';
import {
    InputLabel,
    OutlinedInput,
    FormControl,
    InputAdornment,
    IconButton,
    FormHelperText
} from '@material-ui/core';
import {
    Visibility,
    VisibilityOff
} from '@material-ui/icons';

function FieldPassword({
                           register,
                           errors,
                           passwordValidate = () => {},
                           setInputAnchor = () => {},
                           name,
                           label,
                           helperText,
                           registerRule,
                           labelWidth = 72
}) {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            onFocus={e => setInputAnchor(e.currentTarget)}
            onBlur={() => setInputAnchor(null)}
            error={!!errors[name]}
        >
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <OutlinedInput
                id={name}
                type={showPassword ? 'text' : 'password'}
                defaultValue=""
                autoComplete="password"
                labelWidth={labelWidth}
                inputProps={{
                    name: name,
                    ref: register( registerRule ? registerRule : {
                        validate: {
                            passwordValidate
                        }
                    })
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            tabIndex="-1"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            { helperText && errors && errors[name] && <FormHelperText>{helperText}</FormHelperText> }
        </FormControl>
    );
}

export default FieldPassword;
