import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useStyles } from '../../styles/appbar';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: any) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: "theme.palette.primary.main",
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
interface InterFaceProps {
  passengers: any;
  //updatePassengers: any;
}

export function CustomizedMenus(props: InterFaceProps) {
  const {
      passengers,
      //updatePassengers
  }: InterFaceProps = props;
  
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [adult, setAdult] = React.useState(passengers.adult);
  const [child, setChild] = React.useState(passengers.child);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const adultPlus = () => {
    if (adult !== 8)
      setAdult(adult + 1);
  };

  const adultMinus = () => {
    if (adult !== 0)
      setAdult(adult - 1);
  };

  const childPlus = () => {
    if (child !== 8)
      setChild(child + 1);
  };

  const childMinus = () => {
    if (child !== 0)
      setChild(child - 1);
  };

  const handleClose = () => {
    passengers.adult = adult;
    passengers.child = child;
    setAnchorEl(null);
    //updatePassengers({adult: adult, child: child});
  };

  const handleAbort = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={classes.customMenu}
      >
        Passengers: {passengers.adult + passengers.child}
      </Button>
      <StyledMenu 
        id="customized-menu2"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem className={classes.customMenuText}>
          Adults (12+)
          <Button onClick={adultMinus}> - </Button>
          {adult}
          <Button onClick={adultPlus}> + </Button>
        </StyledMenuItem>
        <StyledMenuItem className={classes.customMenuText}>
          Kids (0-12)  
          <Button className={classes.customMenuButtonChild} onClick={childMinus}> - </Button>
          {child}
          <Button onClick={childPlus}> + </Button>
        </StyledMenuItem>
        <Button className={classes.customMenuCancel} onClick={handleAbort}> Cancel </Button>
        <Button className={classes.customMenuOk} onClick={handleClose}> OK </Button>
      </StyledMenu>
    </div>
  );
}