

const INITIAL_STATE = {
    countries: {Code: "", Name: ""},
};

const applySetCountries = (state: any, action: any) => ({
    ...state,
    countries: action.countries
});

export function countriesReducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "COUNTRIES_SET": {
            return applySetCountries(state, action);
        }
        default:
            return state;
    }
}