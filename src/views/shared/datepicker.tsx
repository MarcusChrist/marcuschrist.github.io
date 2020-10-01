import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { styles } from '../../styles';

interface InterFaceProps {
    label: string;
    width: number;
    onChange: any;
    marginLeft: string;
    marginRight: string;
    value: any;
}

export function DatePickerField(props: InterFaceProps) {
    const {
        label,
        width,
        onChange,
        marginLeft,
        marginRight,
        value
    }: InterFaceProps = props;
    const classes = styles(props);
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = 
    React.useState<Date | null>(
        null,
    );
    // const handleDateChange = (date: any) => {
    //   setSelectedDate(date);
    // };
    // const [focused, setFocused] = useState(false);
    //Validate date
    // var validatedValue = value;
    // try {
    //     if (value.getFullYear() === 1)
    //         validatedValue = null;
    // }
    // catch { 
    //     if (value === "0001-01-01T00:00:00.000Z")
    //         validatedValue = null;
    // }
    // if (label === ("Created From") || label === ("Created To")) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                //disableFuture
                //disablePast
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                key={label}
                id={label}
                label={label}
                style={{ width: width, 
                        height: 30, 
                        //display: "inline-block", 
                        marginTop: "5px", 
                        marginLeft: marginLeft,
                        marginRight: marginRight,}}
                className={classes.textField}
                //value={validatedValue}
                //onChange={handleDateChange}
                value={selectedDate}
                // InputLabelProps={{
                //     shrink: !isNull(selectedDate) || !isNull(validatedValue),
                //     hidden: true }}
                onChange={val => {
                    setSelectedDate(val);
                 //   if (focused && val?.toString() !== "Invalid Date") {
                        setSelectedDate(val);
                        onChange(val);}}
                     //   setFocused(false);}}}
                // KeyboardButtonProps={{'aria-label': 'change date'}}
                    autoOk
                // onClose={ () => {onChange(selectedDate)}}
                // onFocus={ () => {setFocused(true)}}
                // ampm={false}
            />
        </MuiPickersUtilsProvider>
    );
};