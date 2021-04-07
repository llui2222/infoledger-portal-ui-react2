import React, {useState} from "react";
import {
    Button,
    Box,
    Select,
    Checkbox,
    MenuItem,
    ListItemText,
    FormControl,
    InputLabel, Typography
} from '@material-ui/core';
import {Tune} from '@material-ui/icons';
import PageContainer from "./common/containers/PageContainer";
import PageHeader from "./common/PageHeader";
import {makeStyles} from "@material-ui/core/styles";
import NotificationsList from "./NotificationsList";

const useStyles = makeStyles((theme) => ({
    inviteButton: {
        marginRight: theme.spacing(1)
    },
    filterRoot: {
        minWidth: 100
    },
    quickFilters: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    filterButton: {
        minHeight: theme.spacing(7),
        marginRight: theme.spacing(1),
    }
}));

const mockNotifications = [
    {
        type: 'Message',
        status: 'UNREAD',
        relations: ['Fund 4', 'Capital Call'],
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        entity: [
            'Organization 1',
            'Fund 4'
        ],
        date: 1617737299
    },
    {
        type: 'Rejected',
        status: 'READ',
        relations: ['Fund 1', 'Capital Call'],
        message: 'Lorem ipsum dolor.',
        entity: [
            'Organization 2',
            'Fund 1'
        ],
        date: 1617478099
    },
    {
        type: 'For Approval',
        status: 'UNREAD',
        relations: ['Fund 2', 'Capital Call'],
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, laboriosam perferendis.',
        entity: [
            'Organization 1',
            'Fund 2'
        ],
        date: 1617737299
    },
    {
        type: 'Delay',
        status: 'UNREAD',
        relations: ['Fund 3', 'Capital Call'],
        message: 'Lorem ipsum dolor sit amet',
        entity: [
            'Organization 1',
            'Fund 3'
        ],
        date: 1617737299
    },
    {
        type: 'Reminder',
        status: 'READ',
        relations: ['Fund 3', 'Capital Call'],
        message: 'Lorem ipsum',
        entity: [
            'Organization 1',
            'Fund 3'
        ],
        date: 1617737299
    },
];

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
        },
    },
};

function Notifications() {

    const classes = useStyles();
    const [showFilters, setShowFilters] = useState(false);
    const [companies, setCompanies] = useState(['All Companies']);

    const getAllCompanies = (notifications) => {

        const allCompanies = ['All Companies'];

        notifications.map(notification => {
            if(!allCompanies.includes(notification.entity[0])) {
                allCompanies.push(notification.entity[0]);
            }
        });

        return allCompanies;
    }

    return (
        <PageContainer>
            <PageHeader title='Notifications'>
                <Button
                    variant="outlined"
                    color="default"
                    startIcon={<Tune />}
                    className={classes.inviteButton}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    Filter
                </Button>
            </PageHeader>
            <Box className={classes.quickFilters}>
                <FormControl variant="outlined" className={classes.filterButton}>
                    <InputLabel id="company-filter-label">Companies</InputLabel>
                    <Select
                        labelId="company-filter-label"
                        id="company-filter"
                        multiple
                        value={companies}
                        onChange={e => setCompanies(e.target.value)}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        label="Companies"
                        classes={{
                            root: classes.filterRoot
                        }}
                    >
                        {getAllCompanies(mockNotifications).map((company) => (
                            <MenuItem key={company} value={company}>
                                <Checkbox checked={companies.indexOf(company) > -1} />
                                <ListItemText primary={company} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="outlined"
                    color="default"
                    endIcon={<Typography variant='h6'>8</Typography>}
                    className={classes.filterButton}
                >
                    New Messages
                </Button>

                <Button
                    variant="outlined"
                    color="default"
                    endIcon={<Typography variant='h6'>2</Typography>}
                    className={classes.filterButton}
                >
                    Active Transactions
                </Button>
            </Box>
            { showFilters &&
                <Box>
                    Filters
                </Box>
            }

            <NotificationsList notifications={mockNotifications}/>
        </PageContainer>
    );
}

export default Notifications;
