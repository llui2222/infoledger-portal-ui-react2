import React from "react";
import {Typography, Box, IconButton, FormControl, OutlinedInput, InputAdornment} from '@material-ui/core';
import {Search} from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    pageHeader: {
        display: 'flex'
    },
    pageHeaderTitle: {
        marginRight: 'auto'
    },
    search: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: theme.spacing(3),
        '& .MuiInputBase-root': {
            borderRadius: theme.spacing(4)
        },
        '& .MuiOutlinedInput-adornedEnd': {
            paddingRight: 0
        }
    },
    customButtons: {
        height: 36,
        margin: 'auto 0'
    }
}));

function PageHeader({ children, title }) {

    const classes = useStyles();

    return (
        <Box className={classes.pageHeader}>
            <Typography
                variant="h4"
                gutterBottom
                className={classes.pageHeaderTitle}
            >
                {title}
            </Typography>

            <Box className={classes.customButtons}>
                { children }
            </Box>

            <FormControl className={classes.search}>
                <OutlinedInput
                    id="filled-adornment-password"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton type="submit" aria-label="search">
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Box>
    );
}

export default PageHeader;
