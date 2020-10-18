import { getCountries, getSky, getAirport, getIP, flightAmadeus, authAmadeus } from "../../api/getInfo";
import { Search, initAirport, countries } from "../../models/search";
import { DashboardView } from "./dashboard";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { useSnackbar } from "notistack";
import { mapAmadeus } from "../../reducers/mapping";


const Dashboard = (props: any) => {
    const {
      setPrices,
      setAmadeus,
      setProgress,
      setSearchParms
    }: any = props

//const { enqueueSnackbar, closeSnackbar } = useSnackbar();
const [foundCountries, setFoundCountries] = useState(countries);
const [foundOrigin, setFoundOrigin] = useState(initAirport);
const [foundDestination, setFoundDestination] = useState(initAirport);
const { enqueueSnackbar, closeSnackbar } = useSnackbar();
const [myInfo, setMyInfo] = useState({IP: "", Code: "", Airport: ""});
const [auth, setAuth] = useState({expires_in:0, access_token: ""})

useEffect(() => {
  refresh();
}, []);

const refresh = async () => {
  getCountries().then((response) => {
      return response.json();
  }).then((data) => {
      setFoundCountries(data.Countries);
  }).catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
      enqueueSnackbar("Error", { variant: "error" });
  });
  const ip = await getIP();
  const ipAddress = {IP: ip[2].substring(3), Code: ip[8].substring(4), Airport: ip[6].substring(5) + "-sky"};
  setMyInfo(ipAddress);
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
  }).catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
      enqueueSnackbar("Error", { variant: "error" });
  });
};  

const doSearch = (searchParms: Search) => {
  getSky(searchParms).then((response) => {
    if (!response.ok) { throw new Error('Network response was not ok'); };
      return response.json();
  }).then((data) => {
    console.log(data);
    setPrices(data);
  })
  .catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
    enqueueSnackbar(error + ".", { variant: "error" });
  });
};


const doAmadeus = (searchParms: Search) => {
  if (searchParms.passengers.adult === 0 && searchParms.passengers.child === 0) {
    alert("Please enter atleast one passenger!");
    return;
  }
  console.log(searchParms);
  setSearchParms(searchParms);
  setProgress(1);
    
  //const auth = JSON.parse(localStorage.getItem("Auth") || "");
  //var key: string;
  if ((new Date().getTime() / 1000) > auth["expires_in"]) {
    authAmadeus().
      then((response) => {
        if (!response.ok) { 
            console.log(response);
            throw new Error('Network response was not ok');
        };
        return response.json();
    }).then((data) => {
      auth.expires_in = (new Date().getTime() / 1000) + data["expires_in"];
      auth.access_token = data["access_token"];
      //localStorage.setItem("Auth", JSON.stringify(data));
      //key = data["access_token"];
      const body = mapAmadeus(searchParms);
      setTimeout(() => { 
        flightAmadeus(auth.access_token, body).then((response) => {
          if (!response.ok) { 
              console.log(response);
              throw new Error('Network response was not ok');
          };
        }).then((data) => {
          setAmadeus(data);
          setProgress(100);
        }).catch((error) => {
            setProgress(-1);
            console.error('There has been a problem with your fetch operation:', error);
            enqueueSnackbar("Error", { variant: "error" });
        }); 
      }, 1000);
    }).catch((error) => {
      setProgress(-1);
      console.error('There has been a problem with your fetch operation:', error);
      enqueueSnackbar("Error", { variant: "error" });
    });
  } else {
    //key = auth["access_token"];
    const body = mapAmadeus(searchParms);
    flightAmadeus(auth.access_token, body).then((response) => {
      if (!response.ok) { 
          throw new Error('Network response was not ok');
      };
      return response.json();
    }).then((data) => {
      setAmadeus(data);
      setProgress(100);
    }).catch((error) => {
        setProgress(-1);
        console.error('There has been a problem with your fetch operation:', error);
        enqueueSnackbar("Error", { variant: "error" });
    }); 
  };
};

return (
    <div> 
      <DashboardView
        foundCountries={foundCountries}
        doSearch={doSearch}
        foundOrigin={foundOrigin}
        findAirport={findAirport}
        foundDestination={foundDestination}
        myInfo={myInfo}
        doAmadeus={doAmadeus}
        amadeusSearch={props.children}
      />
    </div>
  )
};

const mapStateToProps = (state: any) => ({
  prices: state.messageState.prices,
  amadeus: state.messageState.amadeus,
});

const mapDispatchToProps = (dispatch: any) => ({
  setPrices: (prices: any) => dispatch({ type: "PRICES_SET", prices }),
  setAmadeus: (amadeus: any) => dispatch({ type: "AMADEUS_SET", amadeus }),
  setProgress: (progress: any) => dispatch({ type: "PROGRESS_SET", progress}),
  setSearchParms: (searchParms: any) => dispatch({ type: "SEARCHPARMS_SET", searchParms}),
});


export default compose(connect(mapStateToProps, mapDispatchToProps))(Dashboard);