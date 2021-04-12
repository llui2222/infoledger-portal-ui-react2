import React from "react";
import {Typography, Box, IconButton, FormControl, OutlinedInput, InputAdornment} from '@material-ui/core';
import {Search} from '@material-ui/icons';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    pageHeader: {
        display: 'flex',
        alignItems: 'center'
    },
    pageHeaderTitleWrapper: {
        marginRight: 'auto'
    },
    PageHeaderBackBtn: {
        display: 'block',
        padding: 0,
        textAlign: 'left',
        textTransform: 'capitalize'
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

function PageHeader({children, title, isBackBtn = false, isSearch = true}) {

    const classes = useStyles();
    const history = useHistory();

    const handleBack = () => {
        history.goBack()
    }

    return (
        <Box className={classes.pageHeader}>
            <Box className={classes.pageHeaderTitleWrapper}>
                {
                    isBackBtn && (
                        <Button
                            className={classes.PageHeaderBackBtn}
                            onClick={handleBack}
                            data-testid="backBtn"
                        >
                            {'<-back'}
                        </Button>
                    )
                }
                <Typography
                    variant="h4"
                    gutterBottom
                >
                    {title}
                </Typography>
            </Box>
            <Box className={classes.customButtons}>
                {children}
            </Box>

            {
                isSearch &&
                <FormControl className={classes.search}>
                    <OutlinedInput
                        id="filled-adornment-password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton type="submit" aria-label="search">
                                    <Search/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            }
        </Box>
    );
}

export default PageHeader;
