import React, { useState, useEffect } from "react";
// Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { useStyles } from "../../styles/appbar";
import { TextareaAutosize, TextField, DialogTitle, Paper } from "@material-ui/core";
import { formatFlight } from "./formatter";
import { type } from "jquery";
import { mapConfirmedData } from "../../reducers/mapping";
import { ConfirmedAmadeus, confirmedAmadeusInit } from "../../models/search";
import { authAmadeus, confirmPriceAmadeus } from "../../api/getInfo";


interface InterFaceProps {
    open: boolean;
    handleClose: any;
    confirmedData: ConfirmedAmadeus;
}

const PopupDialog = (props: InterFaceProps) => {
    const { open, handleClose, confirmedData } = props;
    const classes = useStyles(props);
    const [test, setTest] = useState(true);
    const keyPressed = (event: any) => {

        //** Could need a control for when "close" button is marked or when nothing has been changed */
        if (event.key === "Enter") {
            setTest(false);
            //handleUpdate();
        }
    };
    useEffect(() => {
    }, [])

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={"xl"}
                onKeyPress={keyPressed} 
                className={classes.popupDialog}
            >
                <DialogTitle>Confirmed Flight Ticket Information</DialogTitle>
                <DialogContent>
                    <div>
                        {confirmedData ? Object.keys(confirmedData).map((val: string, i: number) => {
                            if (val === "travelers") {
                                for (var num = 0; num < confirmedData.travelers.length; num++) {
                                    return ( 
                                    <Paper>
                                        {"Traveler: " + (num + 1)}
                                    <>
                                        <TextField
                                            id={"textField" + (300 + num).toString()}
                                            key={300 + num}
                                            label={"Cabin"}
                                            margin="normal"
                                            //style={{ width: 200, height: 30 }}
                                            className={classes.textField}
                                            //onChange={handleTextFieldChange(msg.handle)}
                                            value={confirmedData.travelers[num].cabin}
                                            inputProps={{ style: { fontSize: 15 } }} // font size of input text
                                            InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                        />
                                        <TextField
                                            id={"textField" + (300 + num).toString()}
                                            key={300 + num}
                                            label={"fareOption"}
                                            margin="normal"
                                            //style={{ width: 200, height: 30 }}
                                            className={classes.textField}
                                            //onChange={handleTextFieldChange(msg.handle)}
                                            value={confirmedData.travelers[num].fareOption}
                                            inputProps={{ style: { fontSize: 15 } }} // font size of input text
                                            InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                        />
                                        <TextField
                                            id={"textField" + (300 + num).toString()}
                                            key={300 + num}
                                            label={"includedCheckedBags"}
                                            margin="normal"
                                            //style={{ width: 200, height: 30 }}
                                            className={classes.textField}
                                            //onChange={handleTextFieldChange(msg.handle)}
                                            value={confirmedData.travelers[num].includedCheckedBags}
                                            inputProps={{ style: { fontSize: 15 } }} // font size of input text
                                            InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                        />
                                        <TextField
                                            id={"textField" + (300 + num).toString()}
                                            key={300 + num}
                                            label={"refundableTaxes"}
                                            margin="normal"
                                            //style={{ width: 200, height: 30 }}
                                            className={classes.textField}
                                            //onChange={handleTextFieldChange(msg.handle)}
                                            value={confirmedData.travelers[num].refundableTaxes}
                                            inputProps={{ style: { fontSize: 15 } }} // font size of input text
                                            InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                        />
                                        <TextField
                                            id={"textField" + (300 + num).toString()}
                                            key={300 + num}
                                            label={"total"}
                                            margin="normal"
                                            //style={{ width: 200, height: 30 }}
                                            className={classes.textField}
                                            //onChange={handleTextFieldChange(msg.handle)}
                                            value={confirmedData.travelers[num].total}
                                            inputProps={{ style: { fontSize: 15 } }} // font size of input text
                                            InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                        />
                                        <TextField
                                            id={"textField" + (300 + num).toString()}
                                            key={300 + num}
                                            label={"travelerType"}
                                            margin="normal"
                                            //style={{ width: 200, height: 30 }}
                                            className={classes.textField}
                                            //onChange={handleTextFieldChange(msg.handle)}
                                            value={confirmedData.travelers[num].travelerType}
                                            inputProps={{ style: { fontSize: 15 } }} // font size of input text
                                            InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                        />
                                    </>
                                    </Paper>
                                    );
                                }
                            } else {
                                return (
                                    <>
                                        <TextField
                                            id={"textField" + (200 + i).toString()}
                                            key={200 + i}
                                            label={val}
                                            margin="normal"
                                            //style={{ width: 200, height: 30 }}
                                            className={classes.textField}
                                            //onChange={handleTextFieldChange(msg.handle)}
                                            value={confirmedData[val]}
                                            inputProps={{ style: { fontSize: 15 } }} // font size of input text
                                            InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                                        />
                                    </>
                                );
                            } 
                        }) : "" }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleClose} >
                        Ok
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleClose} >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export const CustomDialog = PopupDialog;
