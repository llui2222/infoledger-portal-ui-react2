import React from 'react'
import PropTypes from 'prop-types';

import {Box, Modal as LibraryModal} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    paper: {
        top: '50%',
        left: '50%',
        position: 'fixed',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '15px',
        minWidth: '30vw'
    },
}))
const Modal = (props) => {
    const {isOpen, onClose, title, children, ...rest} = props
    const classes = useStyles()
    return (
        <LibraryModal
            open={isOpen}
            onClose={onClose}
            {...rest}
        >
            <Box className={classes.paper}>
                {typeof title === 'string'
                    ? <Typography variant="h4" component="h4" gutterBottom>
                        {title}
                    </Typography>
                    : title
                }
                {children}
            </Box>
        </LibraryModal>
    )
}

Modal.defaultProps = {
    isOpen: false,
    onClose: () => {
    }
}

Modal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ])
}

export default Modal