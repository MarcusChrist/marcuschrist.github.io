import { makeStyles, createMuiTheme, Theme } from "@material-ui/core/styles";
import smallTravel from "../smallTravel.png"

const _fontSize = 11;
const _fontWeight = 100;
export const darkTheme = createMuiTheme({
    palette: {
        background: {
            paper: "rgba(5, 12, 5, 0.6)",
        },
        type: "dark",
        // primary: {
        //     main: "#ffcc80",
        // },
        secondary: {
            main: "#ff0000"
        }
    },
    typography: {

        fontSize: _fontSize,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    overrides: {
        // @ts-ignore
      MUIDataTableBodyCell: {
        root: {
            paddingTop:"0",
            paddingBottom:"0",
            paddingRight: "0",
        },
      }, 
      MUIDataTable: {
        paper: {
          backgroundColor: "rgba(0, 0, 0, 0.20)",
        },
      },
    }
});
export const lightTheme = createMuiTheme({
    palette: {
        type: "light",
        background: {
            paper: "rgba(255, 225, 255, 0.65)",
        },
    },
    typography: {
        fontSize: _fontSize,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    overrides: {
        // @ts-ignore
      MUIDataTableBodyCell: {
        root: {
            fontSize:"11px",
            paddingTop:"0",
            paddingBottom:"0",
            paddingRight: "0",
            paddingLeft: "1",
            //bold: "true"
        }
      },
      MUIDataTable: {
        paper: {
          backgroundColor: "rgba(155, 12, 255, 0.15)",
        },
      },
    }
});

export const styles = makeStyles((theme: Theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundColor: theme.palette.primary.main,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        marginTop: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
    },
    avatar: {
        margin: theme.spacing(2)
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    formControl: {
        margin: theme.spacing(1)
    },
    closeButton: {
        marginLeft: theme.spacing(3)
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "50%"
    },
    underline: {
        "&:after": {
            borderBottomColor: "2px #f50057 solid"
        }
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));

