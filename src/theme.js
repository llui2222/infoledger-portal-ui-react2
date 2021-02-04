import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { blue, green } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[500],
        },
        secondary: {
            main: green[500],
            secondary: green[700],
        },
    },
    spacing: 8
});

export default theme;