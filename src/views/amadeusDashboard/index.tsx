import React, { useState } from 'react';
import { connect } from "react-redux";
import { compose } from "recompose";
import { makeStyles } from "@material-ui/core/styles";
import { DashboardView } from './dashboard';
import { mapAmadeusPrices } from '../../reducers/mapping';

const styles = makeStyles({
    root: {
        flexGrow: 1
    }
});

const Dashboard3 = (props: any) => {
    const {
        amadeus,
        progress,
        searchParms
    }: any = props

    //const [progress, setProgress] = React.useState(0);
    const classes = styles(props);
    var fixedPrices: any = [];
    var test = progress;

    try {
        if (amadeus !== undefined)
            if (amadeus.data) {
                fixedPrices = mapAmadeusPrices(amadeus);
            }
    }
    catch {
        console.log(amadeus);
        console.log("error på amadeus.data i amadeus/index");
        test = -1;
    }

    const tableData = fixedPrices;
    
    return (
        <div className={classes.root}>

            <DashboardView
                tableData={tableData}
                amadeus={amadeus}
                progress={test}
                searchParms={searchParms}
            />
        </div>
    )
}


const mapStateToProps = (state: any) => ({
    amadeus: state.messageState.amadeus,
    progress: state.messageState.progress,
    searchParms: state.messageState.searchParms
  });
  
  const mapDispatchToProps = (dispatch: any) => ({
    //getCountries: (countries: any) => dispatch({ type: "COUNTRIES_SET", countries }),
  });
  
  
  export default compose(connect(mapStateToProps, mapDispatchToProps))(Dashboard3);
