import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { blue, green } from '@material-ui/core/colors';

const spacing = multiplier => 8 * multiplier;

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
    spacing: spacing(1),
    overrides: {
        MuiDialog: {
            paper: {
                overflowY: 'visible'
            }
        },
        MuiDialogTitle: {
            root: {
                position: 'absolute',
                top: -58,
                paddingLeft: 2,
                color: 'white'
            }
        },
        MuiDialogContent: {
            root: {
                padding: `${spacing(2)}px ${spacing(6)}px`,
                textAlign: 'center'
            }
        }
    },
});

export default theme;