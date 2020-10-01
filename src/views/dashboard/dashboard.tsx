import React, { useState } from 'react';
// Material UI
import MUIDataTable, { MUIDataTableOptions, Display } from "mui-datatables";
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// Views
import { Form } from "./dashboardForm";
// Model
//import { Setup } from "../../models/setup";


interface InterFaceProps {
    data: any;
    // user?: any;
    // deleteSetups: any;
    // addSetup: any;
    //codes?: [Setup]

}
const Dashboard = (props: InterFaceProps) => {
    const {
        data
        // user,
        //codes,
        // deleteSetups,
        // addSetup
    }: InterFaceProps = props;

    // States
    const [isOpen, setOpen] = useState(false);

    // Functions
    const deleteRows = (rows: any) => {
       // deleteSetups(rows);
    }

    const handleClose = () => {
        setOpen(false)
    };

    //const data: any = codes


    const columns = [
        "typeCode",
        "typeDesc",
        "crtUser",
        "crtTime",
        "chgUser",
        "chgTime"
    ];


    const options: MUIDataTableOptions = {
        //responsive: "stacked",
        filterType: 'checkbox',
        onRowClick: (rowData, rowMeta) => {
            const mergedArray = rowData.reduce((result: any, field, index) => {
                result[columns[index]] = field;
                return result;
            }, {})
            setOpen(true);

        },
        customToolbarSelect: (selectedRows) => (
            <div>
                <Tooltip title="Delete">
                    <IconButton
                        onClick={() => {
                            deleteRows(selectedRows);
                        }}

                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </div>
        ),
        customToolbar: () => {
            return (
                <span>
                    <Form/>
                    <Tooltip title="Reload">
                        <IconButton
                        // onClick={() => {
                        //     refreshView();
                        // }}

                        >
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                </span>
            )
        }
    };

    return (
        <div><MUIDataTable
            title={"Prices"}
            data={data}
            columns={columns}
            options={options}
        />
        </div>
    )
}

export const DashboardView = Dashboard;
