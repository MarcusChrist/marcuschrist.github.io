import { getCountries, getSky, getAirport } from "../../api/getInfo";
import { Search, initAirport } from "../../models/search";
import { DashboardView } from "./dashboard";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { useSnackbar } from "notistack";


const Dashboard = (props: any) => {
    const {
    }: any = props

//const { enqueueSnackbar, closeSnackbar } = useSnackbar();
const [foundCountries, setFoundCountries] = useState("");
const [foundOrigin, setFoundOrigin] = useState(initAirport);
const [foundDestination, setFoundDestination] = useState(initAirport);

useEffect(() => {
  refresh();
}, []);
const refresh = () => {
  getCountries().then((response) => {
      return response.json();
  }).then((data) => {
      setFoundCountries(data.Countries);
      //enqueueSnackbar("Login success", { variant: "info" });
  }).catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
      //enqueueSnackbar("Error", { variant: "error" });
  });
};  

const findAirport = (value: any, source: string) => {
  getAirport(value).then((response) => {
      return response.json();
  }).then((data) => {
    if (source === "origin") {
      setFoundOrigin(data.Places);
    } else if (source === "destination") {
      setFoundDestination(data.Places);
    }
      //enqueueSnackbar("Login success", { variant: "info" });
  }).catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
      //enqueueSnackbar("Error", { variant: "error" });
  });
};  

const doSearch = (searchParms: Search) => {
  getSky(searchParms).then((response) => {
    if (!response.ok) { throw new Error('Network response was not ok'); };
      return response.json();
  }).then((data) => {
    console.log(data.Routes.Quotes);
    //setTest(data.Countries);
    //enqueueSnackbar("Search success", { variant: "success" });
  })
  .catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
    //enqueueSnackbar(error + ".", { variant: "error" });
  });
};
return (
    <div> 
      <DashboardView
        foundCountries={foundCountries}
        doSearch={doSearch}
        foundOrigin={foundOrigin}
        findAirport={findAirport}
        foundDestination={foundDestination}
      />
    </div>
  )
};

const mapStateToProps = (state: any) => ({
  countries: state.countries
});

const mapDispatchToProps = (dispatch: any) => ({
  setCountries: (countries: any) => dispatch({ type: "COUNTRIES_SET", countries }),
});


export default compose(connect(mapStateToProps, mapDispatchToProps))(Dashboard);