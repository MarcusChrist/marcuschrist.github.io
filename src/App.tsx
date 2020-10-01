import React, { useState } from 'react';
import './App.css';
import DashboardView from './views/dashboard';
import { SnackbarProvider } from "notistack";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { darkTheme, lightTheme } from './styles';
import { CssBaseline, AppBar, Toolbar, Chip, Avatar, Typography, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Button, Container, Grid, Switch } from '@material-ui/core';
import { useStyles } from './styles/appbar';
import clsx from "clsx";
import { Route } from 'react-router-dom';
import Brightness4Icon from "@material-ui/icons/Brightness4";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import useWindowDimensions from './styles/dimensions';
import Dashboard from "./views/dashboard";

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [lightMode, setLightMode] = useState(true);

  const toggleTheme = () => {
    if (lightMode)
      setLightMode(false);
    else
      setLightMode(true);
  }
  
  const decreaseZoom = () => {
    //ipcRenderer.send('decreaseZoom');
  };
  const increaseZoom = () => {
    //ipcRenderer.send('increaseZoom');
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
        <div className={classes.sizeBot}>
          {width} x {height}
        </div>
      );
    }
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <MuiThemeProvider theme={1 === 1 ? lightTheme : darkTheme}>

      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        maxSnack={3}
      >
        
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar)}>
        <Toolbar variant="dense">
          <Typography variant="h6" noWrap className={classes.title}>
            {"Sky Scanner Online"}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
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
      {/* <Divider /> */}
      <List disablePadding>
        {open ? 
        <Dashboard></Dashboard>
        : ""}
        {/* <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" onClick={signOut} />
        </ListItem>
        <Divider /> */}
      </List>
      {/* <List disablePadding >
        <LicenseDialog open={openDialog} handleClose={handleClose} />
        <ListItem button>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Licenses" onClick={handleClickOpen} />
        </ListItem>
      </List> */}
      {/* <Divider /> */}
      {/* <List className={classes.drawerBottomList} disablePadding>
        <Divider />
        <ListItem button onClick={toggleTheme}>
          <ListItemIcon>
            <Brightness4Icon />
          </ListItemIcon>
          <ListItemText primary={lightMode ? "Light Mode" : "Dark Mode"} />
        </ListItem>
        <Divider />
        {open ? 
          <div>
            <Button
              key={1}
              variant="text"
              color="primary"
              style={{ width: 35, height: 47, display: "inline-flex"}}//, marginRight: "1px", marginLeft: "1px",marginTop: "1px" }}
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
              style={{ width: 35, height: 47, display: "inline-flex"}}//, marginRight: "1px", marginLeft: "1px",marginTop: "1px" }}
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
              //onClick={decreaseZoom}
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
              //onClick={increaseZoom}
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
          <ListItemText primary="Collapse Search Options" />
        </ListItem>
      </List> */}
    </Drawer>
    <main className={classes.content}>
      {/* <div className={classes.appBarSpacer} /> */}
      <Container maxWidth="xl" className={classes.container}>
        <Grid container>
        </Grid>
      </Container>
    </main>
      </SnackbarProvider>
    </MuiThemeProvider>
  </div>
    // <React.Fragment>
    //   <DashboardView></DashboardView>
    // </React.Fragment>
  );
}

export default App;
