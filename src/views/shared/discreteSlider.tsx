import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 146,
    marginLeft: 14,
    marginTop: 12,
    //fontSize: 20
    //display: "inline",
  },
  header: {
      fontSize: 18,
      marginBottom: 0
  }
});



var quality = ["Economy Class","Economy Premium", "Business Class", "First Class"]
var chosen: string;

interface InterFaceProps {
    seatQuality: any;
  }
export default function DiscreteSlider(props: InterFaceProps) {
    const {
        seatQuality
    }: InterFaceProps = props;
    
  const classes = useStyles();
  const [chosen2, setChosen2] = useState("Economy");
  
  function valuetext(value: number) {
      if (chosen !== chosen2) {
          setChosen2(quality[value]);
          seatQuality.text = quality[value];
      }
      return "";
    //return `${value}°C`;
  }

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-small-steps" gutterBottom className={classes.header}>
        {chosen2}
      </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        //aria-labelledby="discrete-slider-small-steps"
        step={1}
        marks
        min={0}
        max={3}
        //valueLabelDisplay="auto"
      />
    </div>
  );
}