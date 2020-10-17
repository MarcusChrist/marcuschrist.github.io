import React from 'react';
import Switch from '@material-ui/core/Switch';
import classes from '*.module.css';
import { useStyles } from '../../styles/appbar';

interface InterFaceProps {
    changeAPI: any;
  }
var labelText = "Amadeus";
export default function SwitchAPI(props: InterFaceProps) {
    const {
      changeAPI
    }: InterFaceProps = props;

  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const handleChange = (event: any) => {
    setState(event.target.checked);
    if (state)
        labelText = "Amadeus";
    else
        labelText = "Sky Scanner";
    
    changeAPI();
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