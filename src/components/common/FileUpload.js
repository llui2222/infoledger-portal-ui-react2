import React, {useState, useRef} from "react";
import {Box, Typography, Button} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { FileCopy } from "@material-ui/icons";
import PageContainer from "../PageContainer";

const useStyles = makeStyles((theme) => ({
    dragAndDropZone: {
        height: '100%',
        position: 'relative',
        border: '2px dashed #ccc',
        padding: theme.spacing(3),
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            borderColor: 'black',
            background: '#ebebeb'
        }
    },
    fileInput: {
        opacity: 0,
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    browseButton: {
        marginLeft: theme.spacing(1)
    }
}));

function FileUpload({ files, setFiles }) {

    const classes = useStyles();
    const fileInputField = useRef(null);

    const handleFileSelect = e => {

        const { files: newFiles } = e.target;

        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            setFiles(updatedFiles);
            console.log(updatedFiles);
        }
    };

    const addNewFiles = (newFiles) => {

        for (let file of newFiles) {
            files[file.name] = file;
        }
        return { ...files };
    };

    return (
        <Box className={classes.dragAndDropZone}>

            <Typography variant="h5" gutterBottom>
                <FileCopy/> Upload ZIP archive
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
                Drag & drop here or
                <Button
                    variant="outlined"
                    className={classes.browseButton}
                >
                    Browse
                </Button>
            </Typography>

            <input
                type="file"
                ref={fileInputField}
                title=""
                value=""
                onChange={handleFileSelect}
                className={classes.fileInput}
                multiple
            />
        </Box>
    );
}

export default FileUpload;
