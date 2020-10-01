import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
// Material UI
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import clsx from "clsx";
// MUI Icons
import BuildIcon from "@material-ui/icons/Build";
import TelegramIcon from '@material-ui/icons/Telegram';
import MessageIcon from "@material-ui/icons/Message";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

// Routes
import {
  DASHBOARD
} from "../../constants/routes";

// Styles
import { useStyles } from "../../styles/appbar";

const MainListItems = (props: any) => {
  const { updateLastLocation, role } = props;
  const [openMaintenace, setMaintenaceOpen] = useState(false);
  const [openMessages, setMessagesOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const location = useLocation();
  const handleMaintenaceClick = () => {
    setMaintenaceOpen(!openMaintenace);
    setMessagesOpen(false);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    updateLastLocation(location.pathname);
    setSelectedIndex(index);
  };

  const popOutWindow = () => {
    window.open("#" + "/popout" + DASHBOARD);

  }

  const handleMessagesClick = () => {
    setMessagesOpen(!openMessages);
    setMaintenaceOpen(false);
  };

  const classes = useStyles();

  return (
    <List disablePadding>
      <ListItem button onClick={handleMessagesClick} selected={openMessages} className={clsx({ [classes.selectedList]: openMessages })}>
        <ListItemIcon>
          <MessageIcon className={clsx({ [classes.selectedColor]: openMessages })} />
        </ListItemIcon>
        <ListItemText primary="Messages" className={clsx({ [classes.selectedColor]: openMessages })} />
        {openMessages ? <ExpandLess className={clsx({ [classes.selectedColor]: openMessages })} /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openMessages} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={clsx({ [classes.selectedList]: openMessages })}>
          <ListItem
            button
            selected={selectedIndex === 0}
            className={classes.nested}
            component={Link}
            to={DASHBOARD}
            onClick={(event: any) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <TelegramIcon className={clsx({ [classes.selectedColor]: selectedIndex === 0 })} />
            </ListItemIcon>
            <ListItemText primary="SRD SID" className={clsx({ [classes.selectedColor]: selectedIndex === 0 })} />
          </ListItem>
          {/* <ListItem
            button
            selected={selectedIndex === 1}
            className={classes.nested}
            component={Link}
            to={SRDGM}
            onClick={(event: any) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <HowToVoteIcon className={clsx({ [classes.selectedColor]: selectedIndex === 1 })} />
            </ListItemIcon>
            <ListItemText primary="SRD GM" className={clsx({ [classes.selectedColor]: selectedIndex === 1 })} />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 2}
            className={classes.nested}
            component={Link}
            to={CREATEMESSAGES}
            onClick={(event: any) => handleListItemClick(event, 2)}
            disabled
          >
            <ListItemIcon>
              <OpenInNewIcon className={clsx({ [classes.selectedColor]: selectedIndex === 2 })} />
            </ListItemIcon>
            <ListItemText primary="SRD Create Message" className={clsx({ [classes.selectedColor]: selectedIndex === 2 })} />
          </ListItem> */}
        </List>
      </Collapse>
      {
        <>
          <ListItem button onClick={handleMaintenaceClick} selected={openMaintenace} className={clsx({ [classes.selectedList]: openMaintenace })}>
            <ListItemIcon>
              <BuildIcon className={clsx({ [classes.selectedColor]: openMaintenace })} />
            </ListItemIcon>
            <ListItemText primary="Maintenace" className={clsx({ [classes.selectedColor]: openMaintenace })} />
            {openMaintenace ? <ExpandLess className={clsx({ [classes.selectedColor]: openMaintenace })} /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMaintenace} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className={clsx({ [classes.selectedList]: openMaintenace })}>
              {/* <ListItem
                button
                className={classes.nested}
                component={Link}
                to={SETUPH}
                selected={selectedIndex === 3}
                onClick={(event: any) => handleListItemClick(event, 3)}
              >
                <ListItemIcon>
                  <StorageIcon className={clsx({ [classes.selectedColor]: selectedIndex === 3 })} />
                </ListItemIcon>
                <ListItemText primary="Setup Main" className={clsx({ [classes.selectedColor]: selectedIndex === 3 })} />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component={Link}
                to={SETUPD}
                selected={selectedIndex === 4}
                onClick={(event: any) => handleListItemClick(event, 4)}
              >
                <ListItemIcon>
                  <StorageIcon className={clsx({ [classes.selectedColor]: selectedIndex === 4 })} />
                </ListItemIcon>
                <ListItemText primary="Setup Data" className={clsx({ [classes.selectedColor]: selectedIndex === 4 })} />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component={Link}
                to={SCANCODES}
                selected={selectedIndex === 5}
                onClick={(event: any) => handleListItemClick(event, 5)}
              >
                <ListItemIcon>
                  <CropFreeIcon className={clsx({ [classes.selectedColor]: selectedIndex === 5 })} />
                </ListItemIcon>
                <ListItemText primary="Scan Codes" className={clsx({ [classes.selectedColor]: selectedIndex === 5 })} />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component={Link}
                to={NEBCODES}
                selected={selectedIndex === 6}
                onClick={(event: any) => handleListItemClick(event, 6)}
              >
                <ListItemIcon>
                  <RotateRightIcon className={clsx({ [classes.selectedColor]: selectedIndex === 6 })} />
                </ListItemIcon>
                <ListItemText primary="NEB Codes" className={clsx({ [classes.selectedColor]: selectedIndex === 6 })} />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component={Link}
                to={TAGCODES}
                selected={selectedIndex === 7}
                onClick={(event: any) => handleListItemClick(event, 7)}
              >
                <ListItemIcon>
                  <LabelIcon className={clsx({ [classes.selectedColor]: selectedIndex === 7 })} />
                </ListItemIcon>
                <ListItemText primary="Tag Codes" className={clsx({ [classes.selectedColor]: selectedIndex === 7 })} />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component={Link}
                to={USERS}
                selected={selectedIndex === 8}
                onClick={(event: any) => handleListItemClick(event, 8)}
              >
                <ListItemIcon>
                  <PeopleIcon className={clsx({ [classes.selectedColor]: selectedIndex === 8 })} />
                </ListItemIcon>
                <ListItemText primary="Users" className={clsx({ [classes.selectedColor]: selectedIndex === 8 })} />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                component={Link}
                to={SCHEMAS}
                selected={selectedIndex === 9}
                onClick={(event: any) => handleListItemClick(event, 9)}
              >
                <ListItemIcon>
                  <AmpStoriesIcon className={clsx({ [classes.selectedColor]: selectedIndex === 9 })} />
                </ListItemIcon>
                <ListItemText primary="Schemas" className={clsx({ [classes.selectedColor]: selectedIndex === 9 })} />
              </ListItem> */}
            </List>
          </Collapse>
        </>
      }
    </List>
  );
};

const mapStateToProps = (state: any) => ({
  role: state.sessionState.role
});

const mapDispatchToProps = (dispatch: any) => ({
  updateLastLocation: (lastLocation: string) => dispatch({ type: "UPDATE_ROUTE", lastLocation }),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  MainListItems
);

