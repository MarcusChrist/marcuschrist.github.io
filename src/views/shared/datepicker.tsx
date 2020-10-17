import React from 'react';
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
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                disablePast
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
                value={value}
                onChange={val => {onChange(val);}}
                autoOk
            />
        </MuiPickersUtilsProvider>
    );
};