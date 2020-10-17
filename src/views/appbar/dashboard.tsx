import { Button, TextField, DialogTitle, Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Search, searchInit, Web } from "../../models/search";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DatePickerField } from "../shared/datepicker";
import { useStyles } from "../../styles/appbar";
import { crawler, flightAmadeus } from "../../api/getInfo";
import { CustomizedMenus } from "../shared/customMenu";
import DiscreteSlider from "../shared/discreteSlider";
import SwitchTrip from "../shared/switchTrip";
import SliderMax from "../shared/sliderMax";
import { mapAmadeus } from "../../reducers/mapping";
import { PopupBestTrips } from "../bestTrips/popupBestTrips";

interface InterFaceProps {
    foundCountries: any;
    doSearch: any;
    foundOrigin: any;
    findAirport: any;
    foundDestination: any;
    myInfo: any;
    doAmadeus: any;
    amadeusSearch: boolean;
  }
  
  const Dashboard = (props: InterFaceProps) => {
    const {
      foundCountries,
      doSearch,
      foundOrigin,
      findAirport,
      foundDestination,
      myInfo,
      doAmadeus,
      amadeusSearch
    }: InterFaceProps = props;

    const [searchParms, setSearchParm] = useState<Search>(searchInit);
    const [isOpenPopup, setOpenPopup] = useState(false);
    const [startUp, setStartUp] = useState(true);
    const classes = useStyles();

    //Get start values depending on location
    if (myInfo.Code !== "" && startUp && foundCountries[0].Code !== 'NoCountry') {
      setStartUp(false);
      const country = foundCountries.find(startCountry);
      findAirport(country, "origin");
      const airport = foundOrigin.find(startOrigin);
      const today = new Date();
      const tomorrow = new Date(today);
      const returnDate = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      returnDate.setDate(tomorrow.getDate() + 3);
      setSearchParm({...searchParms, country: country, origin: country, originAirport: airport, 
        outboundDate: tomorrow, returnDate: returnDate });
    }
    const handleSearch = () => {  
        doSearch(searchParms);
    };
    
    const handleAmadeus = () => {  
        doAmadeus(searchParms);
    };

    const handleAirport = (name: any) => (event: React.ChangeEvent<{}>, newValue: any) => {
      if (newValue === null) { return };
      setSearchParm({ ...searchParms, [name]: newValue });
    };

    const updatePassengers = (value: any) => {
      setSearchParm({...searchParms, passengers: value});
    }

    const handleCountry = (event: React.ChangeEvent<{}>, newValue: any) => {
      if (newValue === null) { return };

      setSearchParm({ ...searchParms, country: newValue });
      console.log(newValue);
    };

    const handleOrigin = (event: React.ChangeEvent<{}>, newValue: any) => {
      if (newValue === null) { return };
      
      setSearchParm({ ...searchParms, origin: newValue });
      findAirport(newValue, "origin");
    };

    const handleDestination = (event: React.ChangeEvent<{}>, newValue: any) => {
      if (newValue === null) { return };

      setSearchParm({ ...searchParms, destination: newValue });
      findAirport(newValue, "destination");
    };

    const handleDateChange = (name: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParm({ ...searchParms, [name]: event });
    };

    function isCountry(fruit: any) { 
      return fruit.Code === searchParms.country.Code;
    };

    function isOrigin(fruit: any) { 
      return fruit.Code === searchParms.origin.Code;
    };

    function isOriginAirport(fruit: any) {
      return fruit.PlaceId === searchParms.originAirport.PlaceId;
    };

    function isDestination(fruit: any) { 
      return fruit.Code === searchParms.destination.Code;
    };

    function isDestinationAirport(fruit: any) {
      return fruit.PlaceId === searchParms.destinationAirport.PlaceId;
    };

    function startCountry(fruit: any) { 
      return fruit.Code === myInfo.Code;
    };

    function startOrigin(fruit: any) { 
      return fruit.PlaceId === myInfo.Airport;
    };

    const crawl = async () => {
      const text = await crawler();
      console.log(text);
    }
    
    const handlePopupClose = () => {
      setOpenPopup(false);
    };
    const dummy = async () => {
      setOpenPopup(true);
    };

    return (
      <div className={classes.whiteFont}>
      <Autocomplete
        //multiple
        key={"autocomplete-country"}
        id={"autocomplete-country"}
        options={foundCountries}
        style={{ width: 320, height: 40, marginBottom: "10px", marginLeft: "10px" }}
        getOptionLabel={(option: any) => option.Name}
        renderInput={params => <TextField {...params} label="Your Country" />}
        onChange={handleCountry}
        freeSolo={true}
        openOnFocus={true}
        value={foundCountries.find(isCountry) || "" || undefined }
        hidden={true}
      />
      <DialogTitle>{searchParms.country.Name + " | IP: " + myInfo.IP }</DialogTitle>
      {/* <Autocomplete
        key={"autocomplete-origincountry"}
        id={"autocomplete-origincountry"}
        options={foundCountries}
        style={{ width: 320, height: 40, marginBottom: "10px", marginLeft: "10px" }}
        getOptionLabel={(option: any) => option.Name}
        renderInput={params => <TextField {...params} label="From Country" />}
        onChange={handleOrigin}
        freeSolo={true}
        openOnFocus={true}
        value={foundCountries.find(isOrigin) || "" || undefined}
      /> */}
      <Autocomplete
        //multiple
        key={"autocomplete-originairport"}
        id={"autocomplete-originairport"}
        options={foundOrigin}
        style={{ width: 320, height: 40, marginBottom: "10px", marginLeft: "10px" }}
        getOptionLabel={(option: any) => (option.PlaceId ? option.PlaceName + ": " + option.PlaceId.replace("-sky","") : "")}
        renderInput={params => <TextField {...params} label="From Airport" />}
        onChange={handleAirport("originAirport")}
        freeSolo={true}
        openOnFocus={true}
        value={foundOrigin.find(isOriginAirport) || ""}
      />
      {foundCountries.Code !== "AD" ?
      <Autocomplete
        //multiple
        key={"autocomplete-destinationcountry"}
        id={"autocomplete-destinationcountry"}
        options={foundCountries}
        style={{ width: 320, height: 40, marginBottom: "10px", marginLeft: "10px" }}
        getOptionLabel={(option: any) => option.Name}
        renderInput={params => <TextField {...params} label="To Country" />}
        onChange={handleDestination}
        freeSolo={true}
        openOnFocus={true}
        //value={foundCountries.find(isDestination) || ""}
      /> : "NO INTERNET CONNECTION"}
      <Autocomplete
        //multiple
        key={"autocomplete-destinationairport"}
        id={"autocomplete-destinationairport"}
        options={foundDestination}
        style={{ width: 320, height: 40, marginBottom: "10px", marginLeft: "10px" }}
        getOptionLabel={(option: any) => (option.PlaceId ? option.PlaceName + ": " + option.PlaceId.replace("-sky","") : "")}
        renderInput={params => <TextField {...params} label="To Airport" />}
        onChange={handleAirport("destinationAirport")}
        freeSolo={true}
        openOnFocus={true}
        //value={foundOrigin.find(isDestinationAirport) || ""}
      />
          <DatePickerField
            key={"outboundDate"}
            label={"Outbound Date"}
            width={150}
            onChange={handleDateChange("outboundDate")}
            value={searchParms.outboundDate || ""}
            marginLeft={"8px"}
            marginRight={"8px"}
          />
          <DatePickerField
            key={"returnDate"}
            label={"Return Date"}
            width={150}
            onChange={handleDateChange("returnDate")}
            value={searchParms.returnDate || ""}
            marginLeft={"14px"}
            marginRight={"8px"}
          />
          <Box component="div" display="flex">
            <CustomizedMenus passengers={searchParms.passengers}/> {/* updatePassengers={updatePassengers}/> */}
            <DiscreteSlider seatQuality={searchParms.seatQuality}/>
          </Box>
          <Box component="div" display="flex" fontSize={"20px"}>
            <SwitchTrip oneWay={searchParms.oneWay}/>
            <SliderMax maxPrice={searchParms.maxPrice} currency={searchParms.currency}/>
          </Box>
            <Button
              key={"searchButton"}
              variant="contained"
              color="primary"
              disabled={searchParms.destinationAirport === "" || searchParms.originAirport === "" ||
                searchParms.outboundDate === new Date("0001-01-01") || searchParms.returnDate === new Date("0001-01-01")
                  ? true : false}
              style={{ fontSize: 20, width: "96%", height: 50, display: "block", margin: "2%" }}
              // disabled={progress === 100 || progress === 0 ? false : true}2+
              //endIcon={<SearchIcon />}
              onClick={amadeusSearch ? handleAmadeus : handleSearch} 
              >
              Find Cheapest Flights
            </Button>
            {/* <Button
              key={"authButton"}
              variant="contained"
              color="primary"
              style={{ width: 100, height: 25, display: "inline-block", marginTop: "16px", marginLeft: "6px", marginBottom: "16px"  }}
              //disabled={searchParms.passengers.adult === 0 && searchParms.passengers.child === 0}
              onClick={handleAmadeus} 
              >
              Auth
            </Button> */}
            {/* <Button
              key={"crawlButton"}
              variant="contained"
              color="primary"
              style={{ width: 100, height: 25, display: "inline-block", marginTop: "16px", marginLeft: "6px", marginBottom: "16px" }}
              // disabled={progress === 100 || progress === 0 ? false : true}2+
              //endIcon={<SearchIcon />}
              onClick={crawl} 
              >
              Crawl
            </Button> */}
            <Button
              key={"dummyButton"}
              variant="contained"
              color="primary"
              style={{ fontSize: 20, width: "96%", height: 50, display: "block", margin: "2%", }}
              // disabled={progress === 100 || progress === 0 ? false : true}2+
              //endIcon={<SearchIcon />}
              onClick={dummy} 
              >
              Find Your Best Flights
            </Button>
        {isOpenPopup ?
        <PopupBestTrips open={isOpenPopup} handleClose={handlePopupClose} myInfo={myInfo} foundCountries={foundCountries} />
        : "" }
        </div>
        
        
    );
};

export const DashboardView = Dashboard;