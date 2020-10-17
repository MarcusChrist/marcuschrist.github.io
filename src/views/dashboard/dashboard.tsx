import React, { useState } from 'react';
import MUIDataTable, { MUIDataTableOptions, Display } from "mui-datatables";
import { columnsPrices, Search } from '../../models/search';
import classes from '*.module.css';
import { useStyles } from "../../styles/appbar";
import { crawler } from '../../api/getInfo';
import { LinearProgress } from '@material-ui/core';

interface InterFaceProps {
    data?: any;
    currency?: any;
    progress: number;
    //startSession: any;
}
const Dashboard = (props: InterFaceProps) => {
    const {
        data,
        currency,
        progress,
        //startSession
    }: InterFaceProps = props;

    // States
    const [isOpen, setOpen] = useState(false);
    const [setupItem, setSetupItem] = useState<Search>();
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false)
    };
    const columns: any = {};

    const options: MUIDataTableOptions = {
        rowsPerPage: 1000,
        selectableRows: 'none',
        tableBodyMaxHeight: "500px",
        pagination: false,
        search: false,
        download: false,
        print: false,
        viewColumns: false,
        filter: false,
        
        
        

        onRowClick: (rowData, rowMeta) => {
            //console.log(rowData);
            //console.log(rowMeta);
            //setSetupItem(data[rowMeta.dataIndex]);
            //console.log(setupItem);
            //setOpen(true);
            //startSession();
        },
    };
    
    return (
        // <div>
        //     <iframe width={"500px"} height={"500px"}
        //         src="https://widgets.skyscanner.net/widget-server/widgets/iframe?skyscannerWidget=MultiVerticalWidget&locale=en-GB&market=GB&currency=GBP&originGeoLookup=true"
        //     ></iframe>
        // </div>
            <div className={classes.dialog}>
            <MUIDataTable
                title={data.length + " Flights found from SkyScanner."}
                data={data ? data : ""}
                columns={columnsPrices ? columnsPrices : columns}
                options={options}
            />        
        </div>
    );
};

export const DashboardView = Dashboard;

