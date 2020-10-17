import React from 'react';
import Switch from '@material-ui/core/Switch';
import classes from '*.module.css';
import { useStyles } from '../../styles/appbar';

interface InterFaceProps {
    oneWay: any;
  }
var labelText = "Roundtrip";
export default function SwitchTrip(props: InterFaceProps) {
    const {
        oneWay
    }: InterFaceProps = props;

  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const handleChange = (event: any) => {
    setState(event.target.checked);
    if (state)
      labelText = "Roundtrip";
    else
      labelText = "One-way";
    oneWay.text = labelText;
  };

  return (
    <div className={classes.switchTrip}>
      <Switch
        checked={state}
        onChange={handleChange}
        name="oneWay"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      /> {labelText}
    </div>
  );
}