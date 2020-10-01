export class Search {
    country: any | undefined;
    currency: string | undefined;
    origin: any | undefined;
    originAirport: any | undefined;
    destination: any | undefined;
    destinationAirport: any | undefined;
    outboundDate: Date | undefined;
    returnDate: Date | undefined;
};
export const searchInit: Search = {
    country: "",
    currency: "SEK",
    origin: [{CityId: "", CountryId: "", CountryName: "", PlaceId: "", PlaceName: "", RegionId: ""}],
    originAirport: "",
    destination: [{CityId: "", CountryId: "", CountryName: "", PlaceId: "", PlaceName: "", RegionId: ""}],
    destinationAirport: "",
    outboundDate: new Date("0001-01-01"),
    returnDate: new Date("0001-01-01"),
};

export enum Web {
    urlOrigin = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0",
    urlCountries = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/countries/en-US",
    urlDates = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0",
    urlRoutes = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0",
    urlQuotes = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0",
    host = "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    key = "ad4fb50449msh97e9445ce08d04dp1fe08djsn3d1fec896dd0",
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
]