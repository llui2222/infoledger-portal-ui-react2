import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types';
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import {Edit, HighlightOff, Visibility, VisibilityOff} from "@material-ui/icons";

const FieldState = {
    FOCUSED: 'FOCUSED',
    HOVERED: 'HOVERED',
    DEFAULT: 'DEFAULT'
}

const TextInputWithAdornment = (props) => {

    const {onEditChange, disabled, isPassword, ...rest} = props
    const [isEdit, setIsEdit] = useState(false)
    const [status, setStatus] = useState(FieldState.DEFAULT)
    const [isShowPassword, setIsShowPassword] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        setIsEdit(disabled)
    }, [])

    const handleSwitchEdit = () => {
        setIsEdit(true)
        onEditChange(true)
    }

    const handleIconClick = () => {
        if (FieldState.HOVERED && !isEdit) {
            handleSwitchEdit()
        } else if (isPassword) {
            setIsShowPassword(prevState => !prevState)
        } else {
            ref.current.value = ''
        }
    }

    const getIcon = () => {
        if (status === FieldState.DEFAULT) {
            return null
        } else if (FieldState.HOVERED && !isEdit) {
            return <Edit/>
        } else if (status !== FieldState.DEFAULT && isPassword) {
            return isShowPassword
                ? <Visibility/>
                : <VisibilityOff/>
        } else {
            return <HighlightOff/>
        }
    }

    return (
        <TextField
            required
            defaultValue=''
            fullWidth
            disabled={!isEdit}
            type={isShowPassword || !isPassword ? 'text' : 'password'}
            margin="normal"
            onMouseEnter={() => setStatus(FieldState.HOVERED)}
            onMouseLeave={() => setStatus(FieldState.DEFAULT)}
            inputRef={ref}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleIconClick}>
                            {
                                getIcon()
                            }
                        </IconButton>
                    </InputAdornment>
                )
            }}
            {...rest}
        />
    )

}

TextInputWithAdornment.defaultProps = {
    onEditChange: () => {
    }
}

TextInputWithAdornment.propTypes = {
    onEditChange: PropTypes.func,
    isPassword: PropTypes.bool,
    disabled: PropTypes.bool,
}

export default TextInputWithAdornment