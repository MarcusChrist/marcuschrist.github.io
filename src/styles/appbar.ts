import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { url } from "inspector";
import air from "../air.png"
import travel from "../travel.png"

const drawerWidth = 360;

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            backgroundImage: "url(" + travel + ")",
        },
        appBar: {
            zIndex: -1 ,//theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            backgroundColor: "darkblue",
            overflow: "hidden"
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        title: {
            flexGrow: 1,
            marginLeft: "42%"
            
        },
        chip: {
            margin: theme.spacing(0.5),

        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            backgroundColor: "rgba(0, 0, 0, 0.18)",
            overflowX: "hidden",
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(6) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(8) + 1,
            },
            backgroundColor: "rgba(0, 0, 0, 0.18)",
            overflow: "hidden",
            //marginTop: "-48px"
        },
        rotate180Icon: {
            transform: 'rotate(180deg)',
            transition: theme.transitions.create('transform', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        rotate180Back: {
            transform: 'rotate(0deg)',
            transition: theme.transitions.create('transform', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        drawerBottomList: {
            marginTop: 'auto',
        },
        selectedList: {
            backgroundColor: "rgba(0, 0, 0, 0.08)",
            boxShadow: "inset 4px 0 0" + theme.palette.primary.main.toString(),
        },
        selectedColor: {
            color: theme.palette.primary.main.toString(),
        },
        appBarSpacer: {
            minHeight: 64
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
        avatarSize: {
            position: 'relative',
            width: 30,
            height: 30,
        },
        size: {
            marginLeft: "19%",
            display: "inline-flex",
            fontSize: "15px",
        },
        sizeBot: {
            marginLeft: "2px",
            fontSize: "12px",
            marginBottom: "15px"
        },
        travel: {
            zIndex: -5 ,//theme.zIndex.drawer + 1,
            backgroundImage: "url(" + travel + ")",
            height: "100%",
            width:  "100%",
            position: "absolute",
            overflowY: "auto",
            overflowX: "hidden"
        },
        dataTable: {
            //width: "55%",
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        dataTableOpen: {
            //backgroundColor: "rgba(0, 0, 0, 0.08)",
            responsive:"none",
            //margin: theme.spacing(6),
            marginLeft: drawerWidth,
            marginRight: "19%",
            //padding: theme.spacing(1),
        },
        dataTableClose: {
            //backgroundColor: "rgba(0, 0, 0, 0.08)",
            responsive:"none",
            //margin: theme.spacing(6),
            marginLeft: theme.spacing(8),
            marginRight: "19%",
            //marginRight: theme.spacing(18),
            //padding: theme.spacing(1),
        },
        whiteFont: {
            //marginTop: theme.spacing(2),
        },
        test: {
          backgroundColor: "rgba(0, 0, 0, 0.20)",
        },
        customMenu: {
            margin: theme.spacing(1),
            marginTop: theme.spacing(2),
            width: "150px",
            height: "35px",
            fontSize: "14px",
            backgroundColor: "rgba(155, 12, 255, 0.15)",

        },
        customMenuButtonChild: {
            marginLeft: "10px"
        },
        customMenuCancel: {
            marginLeft: "3%",
            width: "45%",
            height: "35px",
            fontSize: "15px",
            
        },
        customMenuOk: {
            fontSize: "15px",
            marginLeft: "5%",
            width: "45%",
            height: "35px",
        },
        appBarButtons: {
            
        },
        switchTrip: {
            width: "150px",
            marginLeft: "3px"
        },
        customMenuText: {
            fontSize: "15px"
        },
        okIcon: {
            marginLeft: theme.spacing(1),
        },
        closeIcon: {
            marginLeft: theme.spacing(1),
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            marginTop: theme.spacing(0),
            marginBottom: theme.spacing(1),
            height: 50,
            width: 175,
        },
        rawXmlText: {
            width: "100%",
            backgroundColor: "black",
            color: theme.palette.primary.light,
            resize: "none",
            marginTop: "10px",

        },
        popupDialog: {
            backgroundColor: "rgba(155, 12, 255, 0.25)",
        },
        dialog: {
            marginRight: "16px"
        },
        buttonMinus: {
            marginLeft: "-22px"
        }
    }),
);