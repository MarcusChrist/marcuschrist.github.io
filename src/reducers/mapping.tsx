import { Search, ConfirmedAmadeus, confirmedAmadeusInit } from "../models/search";

export function mapPrices(prices: any) {

    var fix: any = [];
    const places: [{ PlaceId: number, SkyscannerCode: string; Name: string; }] = prices.Places;
    const carriers: [{ CarrierId: number; Name: string; }] = prices.Carriers;

    Object.keys(prices.Quotes).map((index: string) => {
        var message: { [key: string]: any } = {};

        //First Currency in price message from API
        message.Currency = prices.Currencies[0].Code;
        //Direct flight
        if (prices.Quotes[index].Direct) { message.Direct = "Yes"; } else { message.Direct = "No"; };
        
        //Minimum Price
        message.MinPrice = prices.Quotes[index].MinPrice;
        //message.MinPrice = prices.Quotes[index].MinPrice + " " + prices.Currencies[0].Code;

        //Quote Date
        message.QuoteDateTime = prices.Quotes[index].QuoteDateTime.substring(0,10) + " " + prices.Quotes[index].QuoteDateTime.substring(16,11);
        
        //Departure Date
        message.DepartureDate = prices.Quotes[index]["OutboundLeg"].DepartureDate.substring(0,10);

        //Origin
        var origin = places.find(({ PlaceId }) => PlaceId === prices.Quotes[index]["OutboundLeg"].OriginId);
        if (origin) {
            message.OriginCode = origin.SkyscannerCode;
            message.OriginName = origin.Name;
        }

        //Destination
        var destination = places.find(({ PlaceId }) => PlaceId === prices.Quotes[index]["OutboundLeg"].DestinationId);
        if (destination) {
            message.DestinationCode = destination.SkyscannerCode;
            message.DestinationName = destination.Name;
        }
        
        //Carriers
        for (var i = 0; i < prices.Quotes[index]["OutboundLeg"].CarrierIds.length; i++) {
                var hej = carriers.find(({ CarrierId }) => CarrierId === prices.Quotes[index]["OutboundLeg"].CarrierIds[i]);
                if (hej) {
                    if (message.Carriers === undefined) {
                        message.Carriers = hej.Name;
                    } else {
                        message.Carriers = message.Carriers + ", " + hej.Name;
                    };
                };
        };

        fix.push(message);
    });

    return fix;
};

export function mapAmadeus(parms: Search) {
    let outboundDate;
    let returnDate;
    let maxPrice;
    let cabin;
    let travelers = [];
    let i = 1

    for (i; i < parms.passengers.adult + 1; i++) {
        travelers.push({ "id": i, "travelerType": "ADULT" });
    }

    for (var y = 0; y < parms.passengers.child; y++, i++) {
        travelers.push({ "id": i, "travelerType": "CHILD" });
    }

    if (parms.seatQuality.text === "Economy Class")
        cabin = "ECONOMY";
    else if (parms.seatQuality.text === "Economy Premium")
        cabin = "ECONOMY";
    else if (parms.seatQuality.text === "Business Class")
        cabin = "BUSINESS";
    else if (parms.seatQuality.text === "First Class")
        cabin = "FIRST";
    
    if (parms.maxPrice.text !== "Disabled")
        maxPrice = parms.maxPrice.text;

    if (parms.outboundDate) {
        if (parms.outboundDate.toString().substr(10,1) === "T") {
            outboundDate = parms.outboundDate.toString().substring(0,10);
        }
        else if (parms.outboundDate.toString().length === 10) {
            outboundDate = parms.outboundDate;
        }
        else if (parms.outboundDate === null) {
            outboundDate = "0001-01-01";
        }
        else {
            //if (parms.outboundDate.toTimeString().substring(0,2) === "00")
                //parms.outboundDate.setUTCHours(24);
            outboundDate = parms.outboundDate.toISOString().substring(0,10);
        } 
    }
    if (parms.returnDate) {
        if (parms.returnDate.toString().substr(10,1) === "T") {
            returnDate = parms.returnDate.toString().substring(0,10);
        }
        else if (parms.returnDate.toString().length === 10) {
            returnDate = parms.returnDate;
        }
        else if (parms.returnDate === null) {
            returnDate = "0001-01-01";
        }
        else {
            //if (parms.returnDate.toTimeString().substring(0,2) === "00")
                //parms.returnDate.setUTCHours(24);
            returnDate = parms.returnDate.toISOString().substring(0,10);
        } 
    }

    const body = { "currencyCode": parms.currency,
    "originDestinations": [{
            "id": "1",
            "originLocationCode": parms.originAirport.PlaceId.replace("-sky",""),
            "destinationLocationCode": parms.destinationAirport.PlaceId.replace("-sky",""),
            "departureDateTimeRange": {
                "date": outboundDate,
                //"time": "00:00:00"
            }
        },
        {
            "id": "2",
            "originLocationCode": parms.destinationAirport.PlaceId.replace("-sky",""),
            "destinationLocationCode": parms.originAirport.PlaceId.replace("-sky",""),
            "departureDateTimeRange": {
                "date": returnDate,
                //"time": "00:00:00"
            }
        }
    ],
    travelers,
    "sources": [
        "GDS"
    ],
    "searchCriteria": {
        "maxFlightOffers": 250,
        maxPrice,
        "connectionRestriction": {
            "maxNumberOfConnections": 0
        },
        "flightFilters": {
            "cabinRestrictions": [
                {
                    "cabin": cabin,
                    "coverage": "MOST_SEGMENTS",
                    "originDestinationIds": [
                        "1"
                    ]
                }
            ],
            "carrierRestrictions": {
                "excludedCarrierCodes": [
                    "AA",
                    "TP",
                    "AZ"
                ]
            }
        }
    }
    }
    console.log(body);
    return body;
}

export function mapAmadeusPrices(prices: any) {

    var fix: any = [];
    var carriers: any = prices.dictionaries.carriers;
    var aircrafts: any = prices.dictionaries.aircraft;
    var locations: any = prices.dictionaries.locations;

    console.log(prices);
    
    Object.keys(prices.data).map((index: string) => {
        
        //Only direct flights
        if (prices.data[index].itineraries[0].segments[1] || prices.data[index].itineraries[1].segments[1])
            return;

        var message: { [key: string]: any } = {};
        //itineraries outbound
        message.outboundDuration  = prices.data[index].itineraries[0].duration.replace("PT", "").replace("H", "h ").replace("M", "m");
        message.outboundArrival   = new Date(prices.data[index].itineraries[0].segments[0].arrival.at).toString();
        message.outboundArrivalAirport = prices.data[index].itineraries[0].segments[0].arrival.iataCode;
        message.outboundArrivalLocation = locations[prices.data[index].itineraries[0].segments[0].arrival.iataCode];
        message.outboundDeparture = new Date (prices.data[index].itineraries[0].segments[0].departure.at).toString();
        message.outboundDepartureAirport = prices.data[index].itineraries[0].segments[0].departure.iataCode;

        //itineraries return
        message.returnDuration    = prices.data[index].itineraries[1].duration.replace("PT", "").replace("H", "h ").replace("M", "m");
        message.returnArrival     = new Date(prices.data[index].itineraries[1].segments[0].arrival.at).toString();
        message.returnArrivalAirport = prices.data[index].itineraries[1].segments[0].arrival.iataCode;
        message.returnDeparture   = new Date(prices.data[index].itineraries[1].segments[0].departure.at).toString();
        message.returnDepartureAirport = prices.data[index].itineraries[1].segments[0].departure.iataCode;
        
        //Seats
        message.bookableSeats     = prices.data[index].numberOfBookableSeats;

        //Price
        message.price             = parseInt(prices.data[index].price.total);
        message.priceBase         = parseInt(prices.data[index].price.base);
        message.currency          = prices.data[index].price.currency;

        //Bags
        try {
            message.outboundBags  = prices.data[index].travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity;
        } catch {
             message.outboundBags = "";
        };
        try {
            message.returnBags    = prices.data[index].travelerPricings[0].fareDetailsBySegment[1].includedCheckedBags.quantity;
        } catch {
            message.returnBags    = "";
        };

        //Carriers
        try {
            message.carrier      = carriers[prices.data[index].itineraries[1].segments[0].operating.carrierCode];
        } catch {
            message.carrier      = "";
        };

        try {
            message.airCraftName = prices.data[index].itineraries[1].segments[0].carrierCode + prices.data[index].itineraries[0].segments[0].number;
        } catch {
            message.airCraftName = "";
        };

        try {
            message.airCraftType = aircrafts[prices.data[index].itineraries[1].segments[0].aircraft.code];
        } catch {
            message.airCraftType = "";
        };
        try {
            message.carrierReturn      = carriers[prices.data[index].itineraries[1].segments[0].operating.carrierCode];
        } catch {
            message.carrierReturn      = "";
        };

        try {
            message.airCraftNameReturn = prices.data[index].itineraries[1].segments[0].carrierCode + prices.data[index].itineraries[1].segments[0].number;
        } catch {
            message.airCraftNameReturn = "";
        };

        try {
            message.airCraftTypeReturn = aircrafts[prices.data[index].itineraries[1].segments[0].aircraft.code];
        } catch {
            message.airCraftTypeReturn = "";
        };

        fix.push(message);
    });

    console.log(fix);
    return fix;
};

export function mapConfirmedData(data: any) {
    var fix: ConfirmedAmadeus = confirmedAmadeusInit;

    fix.id = data.flightOffers[0].id;
    fix.source = data.flightOffers[0].source;
    fix.instantTicketingRequired = data.flightOffers[0].instantTicketingRequired;
    fix.nonHomogeneous = data.flightOffers[0].nonHomogeneous;
    fix.paymentCardRequired = data.flightOffers[0].paymentCardRequired;

    fix.lastTicketingDate = data.flightOffers[0].lastTicketingDate;
    fix.fromDepartureCode = data.flightOffers[0].itineraries[0].segments[0].departure.iataCode;
    fix.fromDepartureTerminal = data.flightOffers[0].itineraries[0].segments[0].departure.terminal;
    fix.fromDepartureAt = data.flightOffers[0].itineraries[0].segments[0].departure.at;
    fix.fromArrivalCode = data.flightOffers[0].itineraries[0].segments[0].arrival.iataCode;
    fix.fromArrivalTerminal = data.flightOffers[0].itineraries[0].segments[0].arrival.terminal;
    fix.fromArrivalAt = data.flightOffers[0].itineraries[0].segments[0].arrival.at;
    fix.fromCarrierCode = data.flightOffers[0].itineraries[0].segments[0].carrierCode;
    fix.fromAircraft = data.flightOffers[0].itineraries[0].segments[0].aircraft.code;
    fix.fromDuration = data.flightOffers[0].itineraries[0].segments[0].duration;
    fix.fromNumberOfStops = data.flightOffers[0].itineraries[0].segments[0].numberOfStops;

    // //If flight return marked
    fix.toDepartureCode = data.flightOffers[0].itineraries[1].segments[0].departure.iataCode;
    fix.toDepartureTerminal = data.flightOffers[0].itineraries[1].segments[0].departure.terminal;
    fix.toDepartureAt = data.flightOffers[0].itineraries[1].segments[0].departure.at;
    fix.toArrivalCode = data.flightOffers[0].itineraries[1].segments[0].arrival.iataCode;
    fix.toArrivalTerminal = data.flightOffers[0].itineraries[1].segments[0].arrival.terminal;
    fix.toArrivalAt = data.flightOffers[0].itineraries[1].segments[0].arrival.at;
    fix.toCarrierCode = data.flightOffers[0].itineraries[1].segments[0].carrierCode;
    fix.toAircraft = data.flightOffers[0].itineraries[1].segments[0].aircraft.code;
    fix.toDuration = data.flightOffers[0].itineraries[1].segments[0].duration;
    fix.toNumberOfStops = data.flightOffers[0].itineraries[1].segments[0].numberOfStops;

    fix.currency = data.flightOffers[0].price.currency;
    fix.total = data.flightOffers[0].price.total;
    fix.base = data.flightOffers[0].price.base;
    fix.billingCurrency = data.flightOffers[0].price.billingCurrency;
    fix.includedCheckedBagsOnly = data.flightOffers[0].pricingOptions.includedCheckedBagsOnly;

    //loop för att kolla fler passagerare
    var travelers: any = [];
    for (var i = 0; i < data.flightOffers[0].travelerPricings.length; i++) {
        var message: { [key: string]: any } = {};
        message.fareOption = data.flightOffers[0].travelerPricings[i].fareOption;
        message.travelerType = data.flightOffers[0].travelerPricings[i].travelerType;
        message.total = data.flightOffers[0].travelerPricings[i].price.total;
        message.refundableTaxes = data.flightOffers[0].travelerPricings[i].price.refundableTaxes;
        message.cabin = data.flightOffers[0].travelerPricings[i].fareDetailsBySegment[0].cabin;
        message.includedCheckedBags = data.flightOffers[0].travelerPricings[i].fareDetailsBySegment[0].includedCheckedBags.quantity;
        travelers.push(message);
    }
    fix.travelers = travelers;

    return fix;
}