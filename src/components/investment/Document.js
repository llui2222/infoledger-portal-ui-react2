import React from 'react'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from "@material-ui/core/styles";
import {Chat, GetApp} from '@material-ui/icons';
import PageContainer from "../common/containers/PageContainer";
import PageHeader from "../common/PageHeader";
import PdfIFrame from "./PdfIFrame";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "../common/Link";

const useStyles = makeStyles(() => ({
    headerBtnWrapper: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'nowrap',
        '& button:not(:last-child)': {
            marginRight: 10
        },
        '& .MuiIcon-root': {
            fontSize: '1.3rem',
            marginRight: '5px'
        }
    },
    bodyWrapper: {
        display: 'flex',
        width: '100%',
    },
    frame: {
        flexGrow: 2,
        height: '80vh',
        position: 'relative',
        '& iframe' :{
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
        }
    },
    rightBar: {
        flexGrow: 1,
        padding: '15px',
        '& .MuiBox-root:not(:last-child)': {
            marginBottom: '12px'
        }
    }
}));


const Document = () => {

    const classes = useStyles();

    return (<PageContainer>
        <PageHeader title="Capital Call November, Fund Name" isBackBtn>
            <div className={classes.headerBtnWrapper}>
                <Button variant="outlined">
                    <Icon>
                        <Chat/>
                    </Icon>
                    <span>Chat</span>
                </Button>
                <Button variant="outlined">
                    <Icon>
                        <GetApp/>
                    </Icon>
                    <span>Download</span>
                </Button>
            </div>
        </PageHeader>
        <Box className={classes.bodyWrapper}>
            <Box className={classes.frame}>
                <PdfIFrame/>
            </Box>
            <Box className={classes.rightBar}>
                <Box>
                    <Typography variant="subtitle1" >
                        Format
                    </Typography>
                    <Typography variant="body1" >
                        PDF
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1" >
                        Author
                    </Typography>
                    <Typography variant="body1" >
                        John Silver
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1" >
                        Date
                    </Typography>
                    <Typography variant="body1" >
                        12/12/2020 1:50pm
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1" >
                        Document type
                    </Typography>
                    <Typography variant="body1" >
                        Capital Call
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1" >
                        Custom tag category
                    </Typography>
                    <Typography variant="body1" >
                       Tag1
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1" >
                        Original message
                    </Typography>
                    <Link to="#" variant="body2">
                        example
                    </Link>

                </Box>
            </Box>
        </Box>
    </PageContainer>)
}

export default Document