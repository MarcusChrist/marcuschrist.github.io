import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Search, searchInit } from "../../models/search";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DatePickerField } from "../shared/datepicker";

interface InterFaceProps {
    foundCountries: any;
    doSearch: any;
    foundOrigin: any;
    findAirport: any;
    foundDestination: any;
  }
  
  const Dashboard = (props: InterFaceProps) => {
    const {
      foundCountries,
      doSearch,
      foundOrigin,
      findAirport,
      foundDestination,
    }: InterFaceProps = props;

    const [searchParms, setSearchParm] = useState<Search>(searchInit);
    
    const handleSearch = () => {    
        doSearch(searchParms);
    };

      const handleAirport = (name: any) => (event: React.ChangeEvent<{}>, newValue: any) => {
        if (newValue === null) { return };
        setSearchParm({ ...searchParms, [name]: newValue });
      };

      const handleCountry = (event: React.ChangeEvent<{}>, newValue: any) => {
        if (newValue === null) { return };

        setSearchParm({ ...searchParms, country: newValue });
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

    return (
      <div>
      {foundCountries.Code !== "AD" ?
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
      /> : "NO INTERNET CONNECTION"}
      <Autocomplete
        key={"autocomplete-origincountry"}
        id={"autocomplete-origincountry"}
        options={foundCountries}
        style={{ width: 320, height: 40, marginBottom: "10px", marginLeft: "10px" }}
        getOptionLabel={(option: any) => option.Name}
        renderInput={params => <TextField {...params} label="From Country" />}
        onChange={handleOrigin}
        freeSolo={true}
        openOnFocus={true}
      />
      <Autocomplete
        //multiple
        key={"autocomplete-originairport"}
        id={"autocomplete-originairport"}
        options={foundOrigin}
        style={{ width: 320, height: 40, marginBottom: "10px", marginLeft: "10px" }}
        getOptionLabel={(option: any) => option.PlaceName + ": " + option.PlaceId.replace("-sky","")}
        renderInput={params => <TextField {...params} label="From Airport" />}
        onChange={handleAirport("originAirport")}
        freeSolo={true}
        openOnFocus={true}
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
      /> : "NO INTERNET CONNECTION"}
      <Autocomplete
        //multiple
        key={"autocomplete-destinationairport"}
        id={"autocomplete-destinationairport"}
        options={foundDestination}
        style={{ width: 320, height: 40, marginBottom: "10px", marginLeft: "10px" }}
        getOptionLabel={(option: any) => option.PlaceName + ": " + option.PlaceId.replace("-sky","")}
        renderInput={params => <TextField {...params} label="To Airport" />}
        onChange={handleAirport("destinationAirport")}
        freeSolo={true}
        openOnFocus={true}
      />
          <DatePickerField
            key={"outboundDate"}
            label={"Outbound Date"}
            width={150}
            onChange={handleDateChange("outboundDate")}
            value={searchParms.outboundDate}
            marginLeft={"8px"}
            marginRight={"8px"}
          />
          <DatePickerField
            key={"returnDate"}
            label={"Return Date"}
            width={150}
            onChange={handleDateChange("returnDate")}
            value={searchParms.returnDate}
            marginLeft={"14px"}
            marginRight={"8px"}
          />
            <Button
              key={"searchButton"}
              variant="contained"
              color="primary"
              disabled={searchParms.destinationAirport === "" || searchParms.originAirport === "" ||
                searchParms.outboundDate === new Date("0001-01-01") || searchParms.returnDate === new Date("0001-01-01")
                  ? true : false}
              style={{ width: 120, height: 35, display: "block", marginTop: "32px", marginLeft: "30%" }}
              // disabled={progress === 100 || progress === 0 ? false : true}2+
              //endIcon={<SearchIcon />}
              onClick={handleSearch} 
              >
              Search
            </Button>
        </div>
    );
};

export const DashboardView = Dashboard;