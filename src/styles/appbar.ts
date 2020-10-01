import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 360;

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
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
            overflowX: 'hidden',
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(6) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(8) + 1,
            },
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
        content: {
            flexGrow: 1,
            padding: theme.spacing(1),
        },
        appBarSpacer: {
            minHeight: 64
        },
        container: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(1),
            paddingLeft: theme.spacing(30),
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
            marginLeft: "18px",
            marginRight: "18px",
            display: "inline-flex",
            fontSize: "15px"
        },
        sizeBot: {
            marginLeft: "2px",
            fontSize: "12px"
        },
    }),
);