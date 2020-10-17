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

    return await fetch(apiCall , {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": Web.host,
            "x-rapidapi-key": Web.key
        }
    });
};

export const getIP = async () => { 
    //get ip
    const response = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
    const htmlString = await response.text(); 
    const ip = htmlString.split('\n');
    
    return ip;
};
export const crawler = async () => { 
    //get ip
    const response = await fetch('https://www.nationsonline.org/oneworld/currencies.htm');
    const htmlString = await response.json(); 
    //console.log(htmlString;
    const crawlerSplit = htmlString.split('\n');
    // const crawler = crawlerSplit.filter(function (el) {
    //     return el !== "";
    //   });
    console.log(crawler);
    return crawler;
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
            var hej1 = searchParms.outboundDate;
            hej1.setUTCHours(24);
            //if (searchParms.outboundDate.toTimeString().substring(0,2) === "00")
            //     searchParms.outboundDate.setUTCHours(24);
            // outboundDate = searchParms.outboundDate.toISOString().substring(0,10);
            outboundDate = hej1.toISOString().substring(0,10);
        } 
    }
    console.log(searchParms.returnDate);
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
            console.log(searchParms.returnDate);
            var hej2 = searchParms.returnDate;
            hej2.setUTCHours(24);
            //if (searchParms.returnDate.toTimeString().substring(0,2) === "00")
            //searchParms.returnDate.setUTCHours(24);
            returnDate = hej2.toISOString().substring(0,10);
        } 
    }
    console.log(searchParms.returnDate);
    var apiCall = Web.urlRoutes + 
                    "/" + searchParms.country.Code + 
                    "/" + searchParms.currency + 
                    "/en-GB" +
                    "/" + searchParms.originAirport.PlaceId + 
                    "/" + searchParms.destinationAirport.PlaceId + 
                    "/" + outboundDate + 
                    "?inboundpartialdate=" + returnDate;
    
    if (returnDate === "0001-01-01")
        apiCall = apiCall.substring(0, apiCall.length - 30);
    
    return await fetch(apiCall, 
        {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": Web.host,
                "x-rapidapi-key": Web.key
        }
    });
};

export const createSession = async ()  => {
    return await fetch(Web.urlSession, 
        {
            body: "cabinclass=Economy\n    &country=UK\n    ¤cy=GBP\n    &locale=en-GB\n    &locationSchema=iata\n" +    
                "&originplace=EDI\n    &destinationplace=LHR\n    &outbounddate=2017-05-30\n    &inbounddate=2017-06-02\n" +    
                    "&adults=1\n    &children=0\n    &infants=0\n    &apikey=ad4fb50449msh97e9445ce08d04dp1fe08djsn3d1fec896dd0",
            "method": "POST",
            "headers": {
            "X-Forwarded-For": "193.15.240.60",
            "Content-Type": "application/x-www-form-urlencoded"
        }
      });
}

export const authAmadeus = async (url: string, key: string, secret: string) => { 

    return await fetch(url, {
        body: "grant_type=client_credentials&client_id=" + key + "&client_secret=" + secret,
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    });
};
export const confirmPriceAmadeus = async (auth: string, body: any) => {

    const url = "https://test.api.amadeus.com/v1/shopping/flight-offers/pricing";
    console.log(body);
    const fixedBody = {
        "data": {
            "type": "flight-offers-pricing",
            "flightOffers": [ body
            ]
        }
    };
    return await fetch(url, {
        method: 'POST',
        headers: { 
            'authorization': "Bearer " + auth,
            'Content-Type': 'application/json' },
        body: JSON.stringify(fixedBody)
    });
};
export const flightAmadeus = async (auth: string, body: any) => {

    const url = "https://test.api.amadeus.com/v2/shopping/flight-offers";
    
    return await fetch(url, {
        method: 'POST',
        headers: { 
            'authorization': "Bearer " + auth,
            'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
};