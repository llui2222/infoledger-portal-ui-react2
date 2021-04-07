import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    Chip,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@material-ui/core';
import {lightGreen,red} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 750,
    },
    typeMessage: {
        backgroundColor: lightGreen[400]
    },
    typeRejected: {
        backgroundColor: red[400],
        color: 'white'
    },
    unreadNotification: {
        '&>th, &>td': {
            fontWeight: 'bold'
        }
    }
}));

function descendingComparator(a, b) {
    if (b['date'] < a['date']) {
        return -1;
    }
    if (b['date'] > a['date']) {
        return 1;
    }
    return 0;
}

function getComparator() {
    return (a, b) => descendingComparator(a, b, 'date');
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'type', numeric: false, disablePadding: true, label: 'Type' },
    { id: 'relation', numeric: true, disablePadding: false, label: 'Relates To' },
    { id: 'message', numeric: true, disablePadding: false, label: 'Message' },
    { id: 'entity', numeric: true, disablePadding: false, label: 'Entity' },
    { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
];

export default function NotificationsList({ notifications }) {
    const classes = useStyles();


    const getTypeClass = (type) => {
        switch (type){
            case 'Message': {
                return classes.typeMessage;
            }
            case 'Rejected': {
                return classes.typeRejected;
            }
        }
    }
    const getNotificationClass = (status) => {

        if (status === 'UNREAD') {
            return classes.unreadNotification;
        }
    }

    const getDate = (timestamp) => {

        const date = new Date(timestamp*1000);

        return date.getDate()+
            "/"+(date.getMonth()+1)+
            "/"+date.getFullYear()+
            " "+date.getHours()+
            ":"+date.getMinutes();
    }

    return(
        <TableContainer>
            <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size='medium'
                aria-label="enhanced table"
            >
                <TableHead>
                    <TableRow>
                        {headCells.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                align={headCell.numeric ? 'right' : 'left'}
                                padding={headCell.disablePadding ? 'none' : 'default'}
                                sortDirection={headCell.id === 'date' ? 'desc' : false}
                            >
                                <TableSortLabel
                                    active={headCell.id === 'date'}
                                >
                                    {headCell.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stableSort(notifications, getComparator())
                        .map((notification, index) => {
                            return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={`notification-${index}`}
                                    className={getNotificationClass(notification.status)}
                                >
                                    <TableCell component="th" scope="row" padding="none">
                                        <Chip className={getTypeClass(notification.type)} label={notification.type} />
                                    </TableCell>
                                    <TableCell align="right">{notification.relations.join(', ')}</TableCell>
                                    <TableCell align="right">{notification.message}</TableCell>
                                    <TableCell align="right">{notification.entity.join(' / ')}</TableCell>
                                    <TableCell align="right">{getDate(notification.date)}</TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}