export class Search {
    country: any | undefined;
    currency: string | undefined;
    origin: any | undefined;
    originAirport: any | undefined;
    destination: any | undefined;
    destinationAirport: any | undefined;
    outboundDate: Date | undefined;
    returnDate: Date | undefined;
    passengers: any | undefined;
    seatQuality: any | undefined;
    oneWay: any | undefined;
    maxPrice: any | undefined;
};
export class ConfirmedAmadeus {
    
    [propName: string]: any;
    base: string | undefined;
    billingCurrency: string | undefined;
    currency: string | undefined;
    fromAircraft: string | undefined;
    fromArrivalAt: string | undefined;
    fromArrivalCode: string | undefined;
    fromArrivalTerminal: string | undefined;
    fromCarrierCode: string | undefined;
    fromDepartureAt: string | undefined;
    fromDepartureCode: string | undefined;
    fromDepartureTerminal: string | undefined;
    fromDuration: string | undefined;
    fromNumberOfStops: number | undefined;
    id: string | undefined;
    includedCheckedBagsOnly: boolean | undefined;
    instantTicketingRequired: boolean | undefined;
    lastTicketingDate: string | undefined;
    nonHomogeneous: boolean | undefined;
    paymentCardRequired: boolean | undefined;
    source: string | undefined;
    toAircraft: string | undefined;
    toArrivalAt: string | undefined;
    toArrivalCode: string | undefined;
    toArrivalTerminal: string | undefined;
    toCarrierCode: string | undefined;
    toDepartureAt: string | undefined;
    toDepartureCode: string | undefined;
    toDepartureTerminal: string | undefined;
    toDuration: string | undefined;
    toNumberOfStops: number | undefined;
    total: string | undefined;
    travelers: any | undefined;

    constructor(instanceData?: ConfirmedAmadeus) {
        this.deserialize!(instanceData);
    }

    deserialize?(instanceData?: ConfirmedAmadeus) {
        if (instanceData) {
            const keys = Object.keys(this);
            for (const key of keys) {
                if (instanceData.hasOwnProperty(key)) {
                    this[key] = instanceData[key];
                }
            }
        }
    }
};
export const confirmedAmadeusInit: ConfirmedAmadeus = {
    base: "",
    billingCurrency: "",
    currency: "",
    fromAircraft: "",
    fromArrivalAt: "",
    fromArrivalCode: "",
    fromArrivalTerminal: "",
    fromCarrierCode: "",
    fromDepartureAt: "",
    fromDepartureCode: "",
    fromDepartureTerminal: "",
    fromDuration: "",
    fromNumberOfStops: 0,
    id: "",
    includedCheckedBagsOnly: true,
    instantTicketingRequired: false,
    lastTicketingDate: "",
    nonHomogeneous: false,
    paymentCardRequired: false,
    source: "",
    toAircraft: "",
    toArrivalAt: "",
    toArrivalCode: "",
    toArrivalTerminal: "",
    toCarrierCode: "",
    toDepartureAt: "",
    toDepartureCode: "",
    toDepartureTerminal: "",
    toDuration: "",
    toNumberOfStops: 0,
    total: "",
    travelers: [{
        cabin: "",
        fareOption: "",
        includedCheckedBags: 0,
        refundableTaxes: "",
        total: "",
        travelerType: "",
    }]
}
export const searchInit: Search = {
    country: {Code: ""},
    currency: "SEK",
    origin: {CityId: "", CountryId: "", CountryName: "", PlaceId: "", PlaceName: "", RegionId: ""},
    originAirport: {
        CityId: ""
        ,CountryId: ""
        ,CountryName: ""
        ,PlaceId: ""
        ,PlaceName: ""
        ,RegionId: ""},
    destination: {CityId: "", CountryId: "", CountryName: "", PlaceId: "", PlaceName: "", RegionId: ""},
    destinationAirport: {
        CityId: "COPE-sky"
        ,CountryId: "DK-sky"
        ,CountryName: "Denmark"
        ,PlaceId: "CPH-sky"
        ,PlaceName: "Copenhagen"
        ,RegionId: ""},
    outboundDate: new Date(),
    returnDate: new Date(),
    passengers: {adult: 1, child: 0},
    seatQuality: {text: ""},
    oneWay: {text: ""},
    maxPrice: {text: "Disabled"},
};

export class FixedPrices {
    [propName: string]: any;
    Direct: boolean | undefined;
    MinPrice: string | undefined;
    QuoteDateTime: string | undefined;
    Carriers: {CarrierId: number, Name: string} | undefined; 
    OriginId: number | undefined; 
    DestinationId: number | undefined;
    DepartureDate: string | undefined;
    
    constructor(instanceData?: FixedPrices) {
        this.deserialize!(instanceData);
    }

    deserialize?(instanceData?: FixedPrices) {
        if (instanceData) {
            const keys = Object.keys(this);
            for (const key of keys) {
                if (instanceData.hasOwnProperty(key)) {
                    this[key] = instanceData[key];
                }
            }
        }
    }
};

export enum Web {
    urlOrigin = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0",
    urlCountries = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/countries/en-US",
    urlDates = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0",
    urlRoutes = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0",
    urlQuotes = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0",
    host = "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    key = "ad4fb50449msh97e9445ce08d04dp1fe08djsn3d1fec896dd0",
    urlSession = "https://partners.api.skyscanner.net/apiservices/pricing/v1.0",
};
export const initAirport = [
    {CityId: "-sky", CountryId: "SE-sky", CountryName: "Sweden", PlaceId: "SE-sky", PlaceName: "Sweden", RegionId: ""},
    {CityId: "STOC-sky", CountryId: "SE-sky", CountryName: "Sweden", PlaceId: "STOC-sky", PlaceName: "Stockholm", RegionId: ""},
    {CityId: "STOC-sky", CountryId: "SE-sky", CountryName: "Sweden", PlaceId: "ARN-sky", PlaceName: "Stockholm Arlanda", RegionId: ""},
    {CityId: "STOC-sky", CountryId: "SE-sky", CountryName: "Sweden", PlaceId: "NYO-sky", PlaceName: "Stockholm Skavsta", RegionId: ""},
    {CityId: "STOC-sky", CountryId: "SE-sky", CountryName: "Sweden", PlaceId: "BMA-sky", PlaceName: "Stockholm Bromma", RegionId: ""},
    {CityId: "STOC-sky", CountryId: "SE-sky", CountryName: "Sweden", PlaceId: "VST-sky", PlaceName: "Stockholm Vasteras", RegionId: ""},
    {CityId: "GOTH-sky", CountryId: "SE-sky", CountryName: "Sweden", PlaceId: "GOT-sky", PlaceName: "Gothenburg Landvetter", RegionId: ""},
    {CityId: "MALM-sky", CountryId: "SE-sky", CountryName: "Sweden", PlaceId: "MMX-sky", PlaceName: "Malmo Sturup", RegionId: ""},
    {CityId: "UMEA-sky", CountryId: "SE-sky", CountryName: "Sweden", PlaceId: "UME-sky", PlaceName: "Umea", RegionId: ""},
    {CityId: "VAXJ-sky", CountryId: "SE-sky", CountryName: "Sweden", PlaceId: "VXO-sky", PlaceName: "Vaxjo", RegionId: ""}
];

export const countries: [{ Name: string; Code: string; }] = [{ Name: "No Country Found", Code: "NoCountry" }];
export const columnsPrices = [
    {name: "Direct", label: "Direct?", options: {display: false}},
    {name: "MinPrice", label: "Price", options: {sortDirection: 'asc', customBodyRender: (value: number) => value + " SEK"}},
    {name: "DepartureDate", label: "Departure"},
    {name: "OriginName", label: "From Airport"},
    {name: "OriginCode", label: " "},
    {name: "DestinationName", label: "Destination"},
    {name: "DestinationCode", label: " "},
    {name: "Carriers", label: "Carriers"},
    {name: "QuoteDateTime", label: "Quote Date"},
];

export const columnsAmadeus = [
    {name: "outboundDuration", label: "Out Duration"},
    {name: "outboundDeparture", label: "Out Depart"},
    {name: "outboundArrival", label: "Out Arrival"},
    {name: "returnDuration", label: "Return Duration"},
    {name: "returnDeparture", label: "Return Depart"},
    {name: "returnArrival", label: "Return Arrival"},
    {name: "bookableSeats", label: "Seats"},
    {name: "price", label: "Price", options: {sortDirection: true}},
    {name: "priceBase", label: "Price Base"},
    {name: "currency", label: "Currency"},
    {name: "outboundBags", label: "To Bags"},
    {name: "returnBags", label: "Back Bags"},
    {name: "airCraftName", label: "Plane"},
    {name: "carrier", label: "Flight Company"},
    {name: "airCraftType", label: "Aircraft model"},
];

export const amadeusParms = { currencyCode: "",
originDestinations: [{
        id: 1,
        originLocationCode: "",
        destinationLocationCode: "",
        departureDateTimeRange: {
            date: "",
            time: ""
        }
    },
    {
        id: 2,
        originLocationCode: "",
        destinationLocationCode: "",
        departureDateTimeRange: {
            date: "",
            time: ""
        }
    }
],
travelers: [
    {
        id: 1,
        travelerType: ""
    },
    {
        id: 2,
        travelerType: ""
    }
],
sources: [
    "GDS"
],
searchCriteria: {
    maxFlightOffers: 2,
    flightFilters: {
        cabinRestrictions: [
            {
                cabin: "BUSINESS",
                coverage: "MOST_SEGMENTS",
                originDestinationIds: [
                    1
                ]
            }
        ],
        carrierRestrictions: {
            excludedCarrierCodes: [
                "AA",
                "TP",
                "AZ"
            ]
        }
    }
}
}