import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 360;

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialog: {
            marginRight: "16px"
            //overflow: "hidden",
            //height: "706px"
        },
        paperLeft: {
            //backgroundColor: "rgba(255, 0, 0, 0.25)",
            width: "38%",
            fontSize: "16px",
            padding: "8px",
            //marginRight: "2px",
        },
        paperRight: {
            //backgroundColor: "rgba(255, 0, 0, 0.25)",
            width: "38%",
            fontSize: "16px",
            padding: "8px",
            //marginRight: "20px",
        },
        paperCenter: {
            //backgroundColor: "rgba(255, 0, 0, 0.25)",
            width: "33%",
            fontSize: "17px",
            padding: "8px",
            //marginRight: "2px",
            //marginRight: "20px",
        },
        icon: {
            display: "flex",
            marginLeft: "2px",
            whiteSpace: "pre"
        },
        icon2: {
            display: "flex",
            marginTop: "2px",
            fontSize: "10px",
        },
        card: {
            backgroundColor: "rgba(0, 0, 255, 0.5)",
            display: "inline-flex",
            width: "100%",
            //padding: "5px",
        },
        bags: {
            marginLeft: "6px",
            marginTop: "6px"
        },
        smallText: {
            fontSize: "11px",
            display: "inline-flex",
            float: "right",
            marginRight: "10px",
            marginTop: "6px"
            //whiteSpace: "pre"
        },
        mediumText: {
            fontSize: "13px",
            display: "inline-flex",
            float: "right",
            marginRight: "10px",
        },
        largeText: {
            fontSize: "35px",
            display: "inline-flex",
            whiteSpace: "pre"
        },
        progress: {
            position: "relative",
            width: "1900px",
            marginLeft: "-400px",
            backgroundColor: "blue",
            zIndex: theme.zIndex.drawer + 10,
        },
        flightsFound: {
            fontSize: "30px",
            display: "block",
            color: "darkblue",
            position: "fixed",
            justifyContent: "center",
            width: "867px",
            //width: "75%",
            //marginRight: "300px",
            height: "80px",
            backgroundColor: "lightblue",

        },
        flightFoundDiv: {
            marginTop: "10px",
            textAlign: "center"

        },
        rawXmlText: {
            //alignContent: "flex-start",
            //marginTop: "10px", 
            //justifyContent:"center",
            //width: "100%",
            //backgroundColor:"green",
        },
        textArea: {
            width: "100%",
            resize: "none",
            marginTop: "10px", 
            //alignContent: "flex-start",
            //backgroundColor: "red",
            //flex: "inline-flex",
        }
    }),
);
