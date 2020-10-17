import React from 'react';
import { connect } from "react-redux";
import { compose } from "recompose";
import { makeStyles } from "@material-ui/core/styles";
import { DashboardView } from './dashboard';
import { mapPrices } from '../../reducers/mapping';
import { createSession } from '../../api/getInfo';

const styles = makeStyles({
    root: {
        flexGrow: 1
    }
});

const Dashboard2 = (props: any) => {
    const {
        prices,
        progress
    }: any = props

    //const [progress, setProgress] = React.useState(0);
    const classes = styles(props);
    var fixedPrices: any = [];
    var fixedCurrency;

    // const startSession = () => {
    //     createSession().then((response) => {
    //       if (!response.ok) { throw new Error('Network response was not ok'); };
    //         console.log(response);
    //         return response.json();
    //     }).then((data) => {
    //       console.log(data);
    //     })
    //     .catch((error) => {
    //       console.error('There has been a problem with your fetch operation:', error);
    //       //enqueueSnackbar(error + ".", { variant: "error" });
    //     });
    // };   
    if (prices.Quotes) {
        fixedPrices = mapPrices(prices);
        fixedCurrency = prices.Currencies[0].Code;
    };

    const currency = fixedCurrency;
    const data = fixedPrices;

    return (
        <div className={classes.root}>

            <DashboardView
                data={data}
                currency={currency}
                progress={progress}
                //startSession={startSession}
            />
        </div>
    )
}


const mapStateToProps = (state: any) => ({
    prices: state.messageState.prices,
    progress: state.messageState.progress
  });
  
  const mapDispatchToProps = (dispatch: any) => ({
    //getCountries: (countries: any) => dispatch({ type: "COUNTRIES_SET", countries }),
  });
  
  
  export default compose(connect(mapStateToProps, mapDispatchToProps))(Dashboard2);


// const mapStateToProps = (state: any) => ({
//     user: state.sessionState.user,
//     codes: state.codeState.codes
// });

// const mapDispatchToProps = (dispatch: any) => ({
//     onSetCodes: (codes: any) => dispatch({ type: "CODES_SET", codes }),
//     onDeleteCode: (code: any) => dispatch({ type: "CODES_DELETE", code }),
//     onAddCode: (code: any) => dispatch({ type: "CODES_INSERT", code }),
//     onUpdateCode: (code: any) => dispatch({ type: "CODES_UPDATE", code })
// });


// export default compose(connect(mapStateToProps, mapDispatchToProps))(Dashboard2);
