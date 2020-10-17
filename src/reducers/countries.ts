

const INITIAL_STATE = {
    prices: [],
    amadeus: [],
    progress: 0,
    searchParms: [],
};

const applySetPrices = (state: any, action: any) => ({
    ...state,
    prices: action.prices
});

const applySetAmadeus = (state: any, action: any) => ({
    ...state,
    amadeus: action.amadeus
});

const applySetProgress = (state: any, action: any) => ({
    ...state,
    progress: action.progress
});

const applySetSearchParms = (state: any, action: any) => ({
    ...state,
    searchParms: action.searchParms
});

export function countriesReducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "PRICES_SET": {
            return applySetPrices(state, action);
        }
        case "AMADEUS_SET": {
            return applySetAmadeus(state, action);
        }
        case "PROGRESS_SET": {
            return applySetProgress(state, action);
        }
        case "SEARCHPARMS_SET": {
            return applySetSearchParms(state, action);
        }
        default:
            return state;
    }
}