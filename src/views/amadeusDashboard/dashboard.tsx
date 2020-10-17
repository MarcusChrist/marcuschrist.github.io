import React, { useState } from 'react';
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { columnsAmadeus, Search, ConfirmedAmadeus, confirmedAmadeusInit } from '../../models/search';
//import { useStyles } from "../../styles/appbar";
import { CustomDialog } from '../shared/popupDialog';
import { authAmadeus, confirmPriceAmadeus } from '../../api/getInfo';
import { mapConfirmedData } from '../../reducers/mapping';
import { LinearProgress, Dialog, DialogContent, Paper, Chip, Badge, Grid } from '@material-ui/core';

//Card
import { useStyles } from '../../styles/card';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import WorkIcon from '@material-ui/icons/Work';
import { cursorTo } from 'readline';

interface InterFaceProps {
    tableData?: any;
    amadeus?: any;
    progress: number;
    searchParms: any;
    //startSession: any;
}
const Dashboard = (props: InterFaceProps) => {
    const {
        tableData,
        amadeus,
        progress,
        searchParms
        //startSession
    }: InterFaceProps = props;

    // States
    const [isOpen, setOpen] = useState(false);
    const [confirmedData, setConfirmedData] = useState<ConfirmedAmadeus>(confirmedAmadeusInit);
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false)
    };
    const clickDialog = () => {
        console.log("hej");
    }
    const changeCursor = () => {
        document.body.style.cursor = "pointer";
    };
    const normalCursor = () => {
        document.body.style.cursor = "default";
    };
    const columns: any = {};

    if (1 === 1) {
        return ( 
            <div className={classes.dialog}>
                {/* {progress === 100 ?  */}
                {/* <Paper className={classes.flightsFound}>
                    <div className={classes.flightFoundDiv}>
                        {"Flights found: " + tableData.length}
                    </div>
                </Paper>  */}
                {/* : ""} */}
            {progress === 100 || progress === 0 ? Object.keys(tableData).map((value: string, index: number) => {
                var toDeparture = tableData[index].outboundDeparture.substring(17,21) + " " + 
                    searchParms.originAirport.PlaceName + " " + tableData[index].outboundDepartureAirport;
                var toArrival = tableData[index].outboundArrival.substring(17,21) + " " + 
                    searchParms.destinationAirport.PlaceName + " " + tableData[index].outboundArrivalAirport;
                var fromDeparture = tableData[index].returnDeparture.substring(17,21) + " " + 
                    searchParms.destinationAirport.PlaceName + " " + tableData[index].returnDepartureAirport;
                var fromArrival = tableData[index].returnArrival.substring(17,21) + " " + 
                    searchParms.originAirport.PlaceName + " " + tableData[index].returnArrivalAirport;
                return (
                <DialogContent key={index}>
                    <Paper className={classes.card} onClick={clickDialog} onMouseOver={changeCursor} onMouseLeave={normalCursor} >
                    <Grid className={classes.paperLeft}>
                        <div>
                            {tableData[index].outboundDeparture.substring(0,11)}
                            <Grid className={classes.mediumText}>
                                {tableData[index].airCraftName} 
                            </Grid>
                        </div>
                        <div className={classes.icon}>
                            <FlightTakeoffIcon fontSize="large"/> 
                            {" " + toDeparture}
                        </div>
                        <div className={classes.icon}>
                            <ArrowDownwardIcon fontSize="large"/>
                            <Chip label={tableData[index].outboundDuration} variant="outlined" size="small" className={classes.icon2}/> 
                            <Grid className={classes.bags}>
                                {tableData[index].outboundBags > 2 ? <WorkIcon/> : ""}
                                {tableData[index].outboundBags > 1 ? <WorkIcon/> : ""}
                                {tableData[index].outboundBags > 0 ? <WorkIcon/> : ""}
                                {" "}
                            </Grid>
                            {/* <Chip label={tableData[index].airCraftName} variant="outlined" size="small" className={classes.icon2}/> */}
                        </div>
                        <div className={classes.icon}>
                            <FlightLandIcon fontSize="large" />
                            {" " + toArrival}
                        </div>
                        <div>
                            {tableData[index].outboundArrival.substring(0,11)}
                            <Grid className={classes.smallText}>
                                {tableData[index].airCraftType}
                            </Grid>
                        </div>
                    </Grid>
                    <Grid className={classes.paperCenter}>
                        <div>
                            <Grid className={classes.largeText}>
                                {tableData[index].price + " "}
                            </Grid>
                            {tableData[index].currency}
                        </div>
                        <div>
                            {tableData[index].carrier}
                        </div>
                        <div>
                            {"Bookable seats: " + tableData[index].bookableSeats}
                        </div>
                    </Grid>
                    <Grid className={classes.paperRight}>
                        <div>
                            {tableData[index].returnDeparture.substring(0,11)}
                            <Grid className={classes.mediumText}>
                                {tableData[index].airCraftNameReturn} 
                            </Grid>
                        </div>
                        <div className={classes.icon}>
                            <FlightTakeoffIcon fontSize="large"/> 
                            {" " + fromDeparture}
                        </div>
                        <div className={classes.icon}>
                            <ArrowDownwardIcon fontSize="large"/>
                            <Chip label={tableData[index].returnDuration} variant="outlined" size="small" className={classes.icon2}/>
                            <Grid className={classes.bags}>
                                {tableData[index].returnBags > 2 ? <WorkIcon/> : ""}
                                {tableData[index].returnBags > 1 ? <WorkIcon/> : ""}
                                {tableData[index].returnBags > 0 ? <WorkIcon/> : ""}
                                {" "}
                            </Grid>
                            {/* <Chip label={tableData[index].airCraftNameReturn} variant="outlined" size="small" className={classes.icon2}/> */}
                        </div>
                        <div className={classes.icon}>
                            <FlightLandIcon fontSize="large" />
                            {" " + fromArrival}
                        </div>
                        <div>
                            {tableData[index].returnArrival.substring(0,11)}
                            <Grid className={classes.smallText}>
                                {tableData[index].airCraftTypeReturn}
                            </Grid>
                        </div>
                    </Grid>
                    </Paper>
                </DialogContent>
                );
                })
            : 
            <div className={classes.progress}>
                <LinearProgress variant={progress === -1 || progress === 100 ?  "determinate" : "indeterminate"} value={progress} color={progress !== -1 ? "primary" : "secondary"} />
                <LinearProgress variant={progress === -1 || progress === 100 ?  "determinate" : "indeterminate"} value={progress} color={progress !== -1 ? "primary" : "secondary"} />
                <LinearProgress variant={progress === -1 || progress === 100 ?  "determinate" : "indeterminate"} value={progress} color={progress !== -1 ? "primary" : "secondary"} />
                <LinearProgress variant={progress === -1 || progress === 100 ?  "determinate" : "indeterminate"} value={progress} color={progress !== -1 ? "primary" : "secondary"} />
            </div> }
        </div>
        );
    } else {
        const options: MUIDataTableOptions = {
            fixedHeader: true,
            rowsPerPage: 32,
            selectableRows: 'none',
            tableBodyMaxHeight: "100%",
            //pagination: false,
            search: false,
            download: false,
            print: false,
            viewColumns: false,
            filter: false,
            //tableBodyHeight: "500px",

            onRowClick: (rowData, rowMeta) => {
                const auth = JSON.parse(localStorage.getItem("Auth") || "");
                var key: string;
                if ((new Date().getTime() / 1000) > auth["expires_in"]) {
                    if (process.env["REACT_APP_API_URL"] && process.env["REACT_APP_API_KEY"] && process.env["REACT_APP_API_SECRET"]) {
                        authAmadeus(process.env["REACT_APP_API_URL"], process.env["REACT_APP_API_KEY"], process.env["REACT_APP_API_SECRET"]).
                        then((response) => {
                            if (!response.ok) { 
                                console.log(response);
                                throw new Error('Network response was not ok');
                            };
                            return response.json();
                        }).then((data) => {
                        data["expires_in"] = (new Date().getTime() / 1000) + data["expires_in"];
                        localStorage.setItem("Auth", JSON.stringify(data));
                        key = data["access_token"];
                        //const body = mapAmadeus(searchParms);
                        setTimeout(() => { 
                            confirmPriceAmadeus(key, amadeus.data[rowMeta.dataIndex]).then((response) => {
                                if (!response.ok) { 
                                    console.log(response);
                                    throw new Error('Network response was not ok');
                                };
                                return response.json();
                            }).then((data) => {
                                setConfirmedData(mapConfirmedData(data.data));
                            })
                            .catch((error) => {
                                console.error('There has been a problem with your fetch operation:', error);
                                //enqueueSnackbar(error + ".", { variant: "error" });
                            });
                        }, 1000);
                        }).catch((error) => {
                            console.error('There has been a problem with your fetch operation:', error);
                            //enqueueSnackbar("Error", { variant: "error" });
                        });
                    };
                } else {
                key = auth["access_token"];
                    confirmPriceAmadeus(key, amadeus.data[rowMeta.dataIndex]).then((response) => {
                        if (!response.ok) { 
                            console.log(response);
                            throw new Error('Network response was not ok');
                        };
                        return response.json();
                        }).then((data) => {
                            setConfirmedData(mapConfirmedData(data.data));
                    })
                    .catch((error) => {
                    console.error('There has been a problem with your fetch operation:', error);
                    //enqueueSnackbar(error + ".", { variant: "error" });
                    });
                };
                    setOpen(true);
                },
            };
        //console.log(data);
        console.log(progress);
        return (
            <div //onKeyPress={keyPressed}
            >
            {/* <Paper> */}
            {isOpen ?
                <CustomDialog open={isOpen} handleClose={handleClose} confirmedData={confirmedData!}
                />
                : <div/>
            }
            <LinearProgress variant={progress === -1 || progress === 100 ?  "determinate" : "indeterminate"} value={progress} color={progress !== -1 ? "primary" : "secondary"} />
                <LinearProgress variant={progress === -1 || progress === 100 ?  "determinate" : "indeterminate"} value={progress} color={progress !== -1 ? "primary" : "secondary"} />
                <MUIDataTable
                    title={tableData.length + " Flights found from Amadeus."}
                    data={tableData ? tableData : ""}
                    columns={columnsAmadeus ? columnsAmadeus : columns}
                    options={options}
                />
                <LinearProgress variant={progress === -1 || progress === 100 ?  "determinate" : "indeterminate"} value={progress} color={progress !== -1 ? "primary" : "secondary"} />
                <LinearProgress variant={progress === -1 || progress === 100 ?  "determinate" : "indeterminate"} value={progress} color={progress !== -1 ? "primary" : "secondary"} />
            </div>
        );
    };
};

export const DashboardView = Dashboard;

