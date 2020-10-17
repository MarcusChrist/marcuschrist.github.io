import React, { useState, useEffect } from "react";
// XML
// Material UI
import Button from "@material-ui/core/Button";
import UpdateIcon from '@material-ui/icons/Update';
import SendIcon from '@material-ui/icons/Send';
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CircularProgress, Icon, Grid, TextareaAutosize, makeStyles } from "@material-ui/core";
import { TabPanel } from "../shared/TabsHelper";
import Autocomplete from "@material-ui/lab/Autocomplete";
// API

const useStyles = makeStyles({
    root: {
      width: 146,
      marginLeft: 14,
      marginTop: 12,
      //fontSize: 20
      //display: "inline",
    },
    myInfo: {
        fontSize: 18,
        marginBottom: 500,
        //style: { width: 150, height: 30, display: "inline-block", marginTop: "16px", marginLeft: "16px", marginBottom: "16px"}
    },
    dialogHeader: {
        width: "99%",
    }
  });

interface InterFaceProps {
  handleClose: any;
  open: boolean;
  myInfo: any;
  foundCountries: any;
}

const PopupDialog = (props: InterFaceProps) => {
  const { handleClose, open, myInfo, foundCountries } = props;
  const [tabVal, setTabValue] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    //refresh();
  }, [])

  function findCountry(fruit: any) { 
    return fruit.Code === myInfo.Code;
  };

  const refresh = () => {
    // fetchMessage("API", user, transactionNumber)
    //   .then((response) => {
    //     // if (!response.ok) {
    //     //   throw new Error('Network response was not ok');
    //     // }
    //     return response.json();
    //   }).then((data) => {
    //     console.log(data);
    //     if (data.responseStatus.main === "Ok") {
    //       setFormattedXml(flatten(parser.parse(data.responseData.MSG)));
    //       setXmlData(new Message(data.responseData));
    //       setOirginalXML(new Message(data.responseData));
    //       setModifiedMessage(new Message(data.responseData));

    //     }
    //     else { throw new Error(data.responseStatus.main + ":  " + data.responseStatus.detail); }
    //   })
    //   .catch((error) => {
    //     console.error('There has been a problem with your fetch operation:', error);
    //   });
  }

  const handleTextChange = (name: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //setMessageHead({ ...editableMessageHead, [name]: event.target.value });
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const keyPressed = (event: any) => {
    if (event.key === "Enter") {
      // if (changedXml.length > 1)  //** Remove comment later for repair-part
      //   handlePopupOpen();        //** Remove comment later for repair-part
      // else                        //** Remove comment later for repair-part
      handleClose();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"xl"}
        onKeyPress={keyPressed}
      >
        <div>
          <DialogTitle>{"Best Traveler Tips"}</DialogTitle>
          <DialogContent className={classes.dialogHeader}
          >
            <Paper>
              <Tabs
                value={tabVal}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="My Information" />
                <Tab label="Most Popular Flights" />
                <Tab label="Cheapest Flights" />
                <Tab label="Exclusive Flights" />
                <Tab label="Admin" />
              </Tabs>
            </Paper>
          </DialogContent>
        </div>
        <DialogContent>
          <TabPanel value={tabVal} index={0}>
            <span>
              <TextField
                id={"textfield-ip"}
                //disabled={true}
                style={{ width: 150, height: 30, display: "inline-block", marginTop: "16px", marginLeft: "16px" }}
                key={"textfield-ip"}
                label={"Your IP"}
                value={myInfo.IP}
                //className={classes.textField}
                margin="normal"
              />
              <Autocomplete
                //multiple
                key={"autocomplete-country"}
                id={"autocomplete-country"}
                options={foundCountries}
                style={{ width: 300, height: 30, display: "inline-block", marginTop: "16px", marginLeft: "16px", marginRight: "12px" }}
                getOptionLabel={(option: any) => option.Name}
                renderInput={params => <TextField {...params} 
                                //inputProps={{ style: { fontSize: 15 } }}
                                label="Your Country" />}
                //onChange={handleCountry}
                freeSolo={true}
                openOnFocus={true}
                value={foundCountries.find(findCountry) || ""}

                //hidden={true}
              />
              <TextField
                id={"textfield-code"}
                //disabled={true}
                style={{ width: 150, height: 30, display: "inline-block", marginTop: "16px", marginLeft: "16px" }}
                key={"textfield-code"}
                label={"Your Code"}
                value={myInfo.Code}
                //className={classes.textField}
                margin="normal"
              />
              <TextField
                id={"textfield-airport"}
                //disabled={true}
                style={{ width: 150, height: 30, display: "inline-block", marginTop: "16px", marginLeft: "16px" }}
                key={"textfield-airport"}
                label={"Your Airport"}
                value={myInfo.Airport}
                //className={classes.textField}
                margin="normal"
              />
            </span>
            {/* {Object.keys(editableMessageHead).map((value: string, index: number) => {
              if (value !== "rrn" && messageHead[value] !== "" && messageHead[value] !== undefined) {
                return (
                  <span>
                    <TextField
                      id={"standard-name" + index.toString()}
                      //disabled={true}
                      style={{ width: 150, height: 30, display: "inline-block", marginTop: "16px" }}
                      key={index + 100}
                      label={value}
                      defaultValue={messageHead[value]}
                      className={classes.textField}
                      margin="normal"
                    />
                  </span>
                );
              }
            })}
            {Object.keys(editableMessageHead).map((value: string, index: number) => {
              if (messageHead[value] === "" || messageHead[value] === undefined) {
                return (
                  <span>
                    <TextField
                      id={"standard-name" + index.toString()}
                      style={{ width: 150, height: 30, display: "inline-block", marginTop: "16px" }}
                      key={index + 200}
                      label={value}
                      defaultValue={messageHead[value]}
                      className={classes.textField}
                      margin="normal"
                    //disabled={true}
                    />
                  </span>
                );
              }
            })} */}
          </TabPanel>
          <>
            <TabPanel value={tabVal} index={1}>
              {/* Only object keys if xmldata and formatted xml is found */}
              {/* {xmlData?.MSG && formattedXml ? Object.keys(formattedXml).map((value: string, index: number) => {
                mappedXml[value] = formattedXml[value];
              }) : <CircularProgress />} */}
              {/* {xmlData?.MSG && formattedXml ? (location === "/messages/srdgm" ?
                <FieldsGM
                  msgid={editableMessageHead.MSGID}
                  mappedXml={mappedXml}
                  handleFormattedXmlChange={handleFormattedXmlChange}
                  handleFormattedXmlChangeDropDown={handleFormattedXmlChangeDropDown}
                /> :
                <FieldsSID
                  msgid={editableMessageHead.MSGID}
                  mappedXml={mappedXml}
                  handleFormattedXmlChange={handleFormattedXmlChange}
                  handleFormattedXmlChangeDropDown={handleFormattedXmlChangeDropDown}
                />) : ""} */}
            </TabPanel>
          </>
          <TabPanel value={tabVal} index={2}>
              <div>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Loading..."
                  contentEditable={false}
                  disabled={true}
                  //className={classes.rawXmlText}
                  //defaultValue={formatXmlLight(originalXML?.MSG)}
                />
              </div>
          </TabPanel>
          <TabPanel value={tabVal} index={3}>
            <div>
              {/* <XMLBuilder setXmlData={setModifiedMessage}
                message={modifiedMessage}
                previousXML={modifiedMessage?.MSG}
                schemas={schemas.filter((schema: Schema) => schema.MSGID === originalXML?.MSGID && schema.ACTIVE === 'Y')} /> */}
            </div>
          </TabPanel>
          <TabPanel value={tabVal} index={4}>
            <div>
              {/* <MUIDataTable
                title={"History"}
                data={historyData}
                columns={columnsHistory}
                options={{
                  print: true,
                  search: false,
                  filter: false,
                  viewColumns: false,
                  download: false,
                  selectableRows: "none",
                }}
              /> */}
            </div>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <div //className={classes2.updateButton}
          >
            <Button
              variant="contained"
              color="secondary"
              endIcon={<UpdateIcon />}
              //onClick={handleToggleXmlRaw}
              style={tabVal === 2 ? {} : { display: "none" }}
            >
              Change color
              </Button>
            <Button
              variant="contained"
              color="secondary"
              //disabled={modifiedMessage?.MSG === xmlData?.MSG}
              endIcon={<SendIcon />}
              //onClick={() => createMessage(xmlData)}
              style={tabVal === 3 ? {} : { display: "none" }}
            >
              Send to HCA
              </Button>
            {/* <Button
              variant="contained"
              color="secondary"
              disabled={modifiedMessage?.MSG === xmlData?.MSG}
              endIcon={<SendIcon />}
              onClick={() => setVerified(currVal => !currVal)}
              style={tabVal === 3 ? {} : { display: "none" }}
            >
              Verify
              </Button> */}
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={handleClose} >
              Close
              {/* <Icon //className={classes.rightIcon}
              >close</Icon> */}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export const PopupBestTrips = PopupDialog;
