import React, { useState } from "react";
// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from '@material-ui/icons/Send';
import IconButton from "@material-ui/core/IconButton";
// Model

const styles = makeStyles((theme: Theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    paper: {
        position: "absolute",
        width: "70%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: "none"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    },
    input: {
        display: "none"
    }
}));


interface State {
    typeDesc: string;
    typeCode: string;

}

interface InterFaceProps {
}

const FormDialog = (props: InterFaceProps) => {


    const classes = styles(props);
    const { }: InterFaceProps = props;
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState<State>({
        typeCode: "",
        typeDesc:""
    });



    const handleChange = (name: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value });
    }

    const handleFormOpen = () => {
        setOpen(true);
    };
    const handleFormClose = () => {
        setOpen(false);
    };


    return (
        <React.Fragment>
            <Tooltip title={"Add Instrument"}>
                <IconButton aria-label="Add" onClick={handleFormOpen}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleFormClose} maxWidth={"md"}>
                <DialogTitle>Register New Code</DialogTitle>
                <DialogContent>
                    <form noValidate autoComplete="off">
                        <TextField
                            id="standard-name"
                            label="TypeCode"
                            className={classes.textField}
                            margin="normal"
                            onChange={handleChange("typeCode")}
                        />
                        <TextField
                            id="standard-name"
                            label="typeDesc"
                            className={classes.textField}
                            margin="normal"
                            onChange={handleChange("typeDesc")}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" endIcon={<SendIcon />}>
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}


export const Form = FormDialog;