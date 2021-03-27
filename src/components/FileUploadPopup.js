import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Box} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import FileUpload from "./common/FileUpload";

const useStyles = makeStyles((theme) => ({
    browseButton: {
        marginLeft: theme.spacing(1)
    }
}));

function FileUploadPopup({ handleFile, className }) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState({});

    return (
        <Box className={className}>
            <Button variant="contained" color="primary" disableElevation onClick={() => setOpen(true)}>
                Upload Files
            </Button>

            <Dialog onClose={() => setOpen(false)} open={open} fullWidth maxWidth='md'>
                <DialogTitle onClose={() => setOpen(false)}>
                    Upload Demo
                </DialogTitle>
                <DialogContent dividers>
                    <FileUpload files={files} setFiles={setFiles}/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => setOpen(false)} color="primary">
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default FileUploadPopup;
