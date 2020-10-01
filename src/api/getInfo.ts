import { Search, Web } from "../models/search";

export const getCountries = async () => {
    
    return await fetch(Web.urlCountries, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": Web.host,
            "x-rapidapi-key": Web.key
        }
    });
};

export const getAirport = async (value: any) => {
    
    var country = value.Name.replace(/\s/g, "%20");

    var apiCall = Web.urlOrigin + 
                    "/" + value.Code + 
                    "/SEK/en-US" +
                    "/?query=" + country;

    console.log(apiCall);
    return await fetch(apiCall , {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": Web.host,
            "x-rapidapi-key": Web.key
        }
    });
};

export const getSky = async (searchParms: Search) => {

    let outboundDate;
    let returnDate;
    if (searchParms.outboundDate) {
        if (searchParms.outboundDate.toString().substr(10,1) === "T") {
            outboundDate = searchParms.outboundDate.toString().substring(0,10);
        }
        else if (searchParms.outboundDate.toString().length === 10) {
            outboundDate = searchParms.outboundDate;
        }
        else if (searchParms.outboundDate === null) {
            outboundDate = "0001-01-01";
        }
        else {
            if (searchParms.outboundDate.toTimeString().substring(0,2) === "00")
                searchParms.outboundDate.setUTCHours(24);
            outboundDate = searchParms.outboundDate.toISOString().substring(0,10);
        } 
    }
    if (searchParms.returnDate) {
        if (searchParms.returnDate.toString().substr(10,1) === "T") {
            returnDate = searchParms.returnDate.toString().substring(0,10);
        }
        else if (searchParms.returnDate.toString().length === 10) {
            returnDate = searchParms.returnDate;
        }
        else if (searchParms.returnDate === null) {
            returnDate = "0001-01-01";
        }
        else {
            if (searchParms.returnDate.toTimeString().substring(0,2) === "00")
                searchParms.returnDate.setUTCHours(24);
            returnDate = searchParms.returnDate.toISOString().substring(0,10);
        } 
    }

    var apiCall = Web.urlRoutes + 
                    "/" + searchParms.country.Code + 
                    "/" + searchParms.currency + 
                    "/en-US" +
                    "/" + searchParms.originAirport.PlaceId + 
                    "/" + searchParms.destinationAirport.PlaceId + 
                    "/" + outboundDate + 
                    "?inboundpartialdate=" + returnDate;
    
    if (returnDate === "0001-01-01")
        apiCall = apiCall.substring(0, apiCall.length - 30);
    
    console.log(apiCall);
    return await fetch(apiCall, 
        {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": Web.host,
                "x-rapidapi-key": Web.key
        }
    });
};