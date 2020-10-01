import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { compose } from "recompose";
import { makeStyles } from "@material-ui/core/styles";
// Models
//import { Setup } from "../../models/setup";
// API
//import { fetchTextCodes, deleteTextCode, updateTextCode, addTextCode } from "../../api/maintenace";
// Views
import { DashboardView } from "./dashboard";

const styles = makeStyles({
    root: {
        flexGrow: 1
    }
});

const Dashboard2 = (props: any) => {
    const {
        user,
        onSetCodes,
        onDeleteCode,
        onAddCode,
        onUpdateCode,
        codes
    }: any = props

    // Similar to componentDidMount/WillMount
    // useEffect(() => {
    //     fetchTextCodes().then((response) => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     }).then((data) => {
    //         const setupTypes = data.resultSetRows.map((setup: Setup) => new Setup(setup));
    //         onSetCodes(setupTypes);
    //     })
    //         .catch((error) => {
    //             console.error('There has been a problem with your fetch operation:', error);
    //         });
    // }, [])
    const classes = styles(props);
    var data;

    // Functions
    // const addRow = (setup: Setup) => {
    //     const requestObj = {
    //         request: {
    //             typeCode: setup.typeCode,
    //             typeDesc: setup.typeDesc,
    //             crtUser: setup.crtUser,
    //             chgUser: ""
    //         }
    //     }
    //     addTextCode(requestObj).then((response) => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         onAddCode(setup);
    //     })
    //         .catch((error) => {
    //             console.error('There has been a problem with your fetch operation:', error);
    //         });
    // }
    // const deleteRows = (rows: any) => {
    //     for (let index = 0; index < rows.data.length; index++) {
    //         let key = codes[rows.data[index].dataIndex];
    //         deleteTextCode(key.typeCode).then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             onDeleteCode(key);
    //         }).catch((error) => {
    //             console.error('There has been a problem with your fetch operation:', error);
    //         });
    //     }

    // }


    return (
        <div className={classes.root}>

            <DashboardView
                data={data}
                //user={user}
                //codes={codes}
                //deleteSetups={deleteRows}
                //addSetup={addRow}
            />
        </div>
    )
}


const mapStateToProps = (state: any) => ({
    countries: state.countries
  });
  
  const mapDispatchToProps = (dispatch: any) => ({
    setCountries: (countries: any) => dispatch({ type: "COUNTRIES_SET", countries }),
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
