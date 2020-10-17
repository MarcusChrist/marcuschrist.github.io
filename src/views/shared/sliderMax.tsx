import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 146,
        marginLeft: 28,
        marginTop: 0,
        //marginTop: 12,
        fontSize: 20
        //display: "inline",
      },
      header: {
          fontSize: 16,
          marginBottom: 0
      }
});

interface InterFaceProps {
    maxPrice: any;
    currency: any;
}

export default function SliderMax(props: InterFaceProps) {
    const {
        maxPrice,
        currency
    }: InterFaceProps = props;

  const classes = useStyles();
  const [chosen, setChosen] = useState(0);

  function valuetext(value: number) {
    if (value !== chosen) {
        if (value !== 100 && value !== 10000)
          maxPrice.text = value; 
        else
          maxPrice.text = "Disabled";
        
        setChosen(value);
    } 
    return "";
  }

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-small-steps" gutterBottom className={classes.header}>
        Max Price: {maxPrice.text}{currency && maxPrice.text !== "Disabled" ? " " + currency : ""}
      </Typography>
      <Slider
        defaultValue={100}
        getAriaValueText={valuetext}
        //aria-labelledby="discrete-slider-small-steps"
        step={100}
        marks
        min={100}
        max={10000}
        //valueLabelDisplay="auto"
      />
    </div>
  );
}