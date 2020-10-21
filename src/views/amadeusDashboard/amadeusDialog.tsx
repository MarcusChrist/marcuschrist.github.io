import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Dialog, TextareaAutosize } from '@material-ui/core';
import { formatFlight } from '../shared/formatter';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    textArea: {
        width: "100%",
        resize: "none",
        marginTop: "10px", 
        //alignContent: "flex-start",
        //backgroundColor: "red",
    },
}));


function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface InterFaceProps {
    handleClose: any;
    open: boolean;
    amadeus: any;
    tableData: any;
  }
  

const PopupDialog = (props: InterFaceProps) => {
    const { handleClose, open, amadeus, tableData } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  console.log(amadeus);
  return (
  <Dialog
    open={open}
    onClose={handleClose}
    fullWidth={true}
    maxWidth={"xl"}
    //className={classes.popup}
    >
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Raw Mapped Data" {...a11yProps(0)} />
          <Tab label="Raw Flight Data" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
                    <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Loading..."
                    contentEditable={false}
                    //disabled={false}
                    className={classes.textArea}
                    value={formatFlight(tableData)}
                    />
      </TabPanel>
      <TabPanel value={value} index={1}>
                    <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Loading..."
                    contentEditable={false}
                    //disabled={false}
                    className={classes.textArea}
                    value={formatFlight(amadeus)}
                    />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
    </Dialog>
  );
};
export const AmadeusDialog = PopupDialog;
