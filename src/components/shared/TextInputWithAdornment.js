import React, {useState, useRef, useEffect} from 'react'
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import {Edit, HighlightOff} from "@material-ui/icons";

const FieldState = {
    FOCUSED: 'FOCUSED',
    HOVERED: 'HOVERED',
    DEFAULT: 'DEFAULT'
}

const TextInputWithAdornment = (props) => {

    const {onEditChange, disabled, ...rest} = props
    const [isEdit, setIsEdit] = useState(false)
    const [status, setStatus] = useState(FieldState.DEFAULT)

    const ref = useRef(null)

    useEffect(() => {
        setIsEdit(disabled)
    }, [])

    const handleSwitchEdit = () => {
        setIsEdit(true)
        onEditChange(true)
        ref.current.focus()
    }

    const handleIconClick = () => {
        if (FieldState.HOVERED && !isEdit) {
            handleSwitchEdit()
        } else {
            ref.current.value = ''
        }
    }


    return (
        <TextField
            required
            defaultValue=''
            fullWidth
            disabled={!isEdit}
            type="text"
            margin="normal"
            onMouseEnter={() => setStatus(FieldState.HOVERED)}
            onMouseLeave={() => setStatus(FieldState.DEFAULT)}
            inputRef={ref}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleIconClick}>
                            {
                                status === FieldState.DEFAULT
                                    ? null : FieldState.HOVERED && !isEdit
                                    ? <Edit/>
                                    : <HighlightOff/>
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

export default TextInputWithAdornment