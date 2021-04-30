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
                           errors,
                           name,
                           label,
                           helperText,
                           onFocus,
                           onBlur,
                           register,
                           required,
                           margin,
                           labelWidth = 120,
                           ...restProps
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
            margin={margin}
            error={errors && !!errors[name]}
            onFocus={onFocus}
            onBlur={onBlur}
            required={required}
        >
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <OutlinedInput
                id={name}
                type={showPassword ? 'text' : 'password'}
                autoComplete="password"
                labelWidth={labelWidth}
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
                {...restProps}
            />
            { helperText && errors && errors[name] && <FormHelperText>{helperText}</FormHelperText> }
        </FormControl>
    );
}

export default FieldPassword;
