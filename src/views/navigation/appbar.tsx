import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
// Material UI
import { Button, Chip } from "@material-ui/core";
import clsx from "clsx";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import Brightness4Icon from "@material-ui/icons/Brightness4";

// View
import MainListItems from "./navigationlink";
import * as routes from "../../constants/routes";
// Views
import dashboard from "../dashboard";
import { useStyles } from "../../styles/appbar";
import useWindowDimensions from "../../styles/dimensions";

const CustomAppBar = (props: any) => {
  const classes = useStyles();
  const { user, environment, signOut, toggleTheme, isDarkMode, role } = props;
  const [open, setOpen] = React.useState(true);
  const [openDialog, setDialogOpen] = React.useState(false);
  const location = useLocation();
  const electron = window.require("electron");
  const ipcRenderer = electron.ipcRenderer;

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const decreaseZoom = () => {
    ipcRenderer.send('decreaseZoom');
  };
  const increaseZoom = () => {
    ipcRenderer.send('increaseZoom');
  };

  const Component2 = () => {
    const { height, width } = useWindowDimensions();
    if (open) {
      return (
        <Typography variant="h6" noWrap className={classes.size}>
          {width} x {height}
        </Typography>
      );
    }
    else {
      return (
        <div>
          {width} X {height}
        </div>
      );
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar)}>
        <Toolbar variant="dense">
          <Chip
            label={environment}
            className={classes.chip}
            avatar={<Avatar>{environment.substring(0, 1)}</Avatar>}
          />
          <Typography variant="h6" noWrap className={classes.title}>
            {"HUB 20022 ...Path: " + location.pathname.toUpperCase().replace("/"," ").replace("/"," ")}
          </Typography>
          {user && (
            <Avatar className={classes.avatarSize}>
              {user.substring(4, 5) + user.substring(2, 3)}
            </Avatar>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <Toolbar variant="dense" />
        <MainListItems />
        <Divider />
        <List disablePadding>
          <ListItem button onClick={toggleTheme}>
            <ListItemIcon>
              <Brightness4Icon />
            </ListItemIcon>
            <ListItemText primary={isDarkMode ? "Light Mode" : "Dark Mode"} />
          </ListItem>
        </List>
        <Divider />
        <List className={classes.drawerBottomList} disablePadding>
          <Divider />
          {open ? 
            <div>
              <Button
                key={1}
                variant="text"
                color="primary"
                style={{ width: 35, height: 35, display: "inline-flex"}}//, marginRight: "1px", marginLeft: "1px",marginTop: "1px" }}
                onClick={decreaseZoom}
                title={"Decrease"}
                >
                -
              </Button>
              <Component2></Component2>
              <Button
                key={0} 
                variant="text"
                color="primary"
                style={{ width: 35, height: 35, display: "inline-flex"}}//, marginRight: "1px", marginLeft: "1px",marginTop: "1px" }}
                onClick={increaseZoom}
                title={"Increase"}>
                +
              </Button>
            </div> : 
            <div>
              <Button
                key={1}
                variant="text"
                color="primary"
                style={{ width: 35, height: 35, display: "list-item"}}//, marginRight: "1px", marginLeft: "1px",marginTop: "1px" }}
                onClick={decreaseZoom}
                title={"Decrease"}
                >
                -
              </Button>
              <Component2></Component2>
              <Button
                key={0} 
                variant="text"
                color="primary"
                style={{ width: 35, height: 35, display: "list-item"}}//, marginRight: "1px", marginLeft: "1px",marginTop: "1px" }}
                onClick={increaseZoom}
                title={"Increase"}>
                +
              </Button>
            </div>
          }
          <Divider />
          <ListItem
            button
            onClick={open ? handleDrawerClose : handleDrawerOpen}
          >
            <ListItemIcon>
              {open ? (
                <DoubleArrowIcon className={classes.rotate180Icon} />
              ) : (
                  <DoubleArrowIcon className={classes.rotate180Back} />
                )}
            </ListItemIcon>
            <ListItemText primary="Collapse SideBar" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Grid container>
            <Switch>
              <Route path={routes.DASHBOARD} component={dashboard} />
            </Switch>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.sessionState.user,
  environment: state.sessionState.environment,
  isDarkMode: state.sessionState.isDarkMode,
  role: state.sessionState.role
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleTheme: () => dispatch({ type: "TOGGLE_THEME" }),
  signOut: () => dispatch({ type: "LOGOUT" })
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  CustomAppBar
);
