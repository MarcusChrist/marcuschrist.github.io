import React from "react";
import { Switch, Route } from "react-router-dom";
import * as routes from "../../constants/routes";
// Views
import dashboard from "../dashboard";
import { useStyles } from "../../styles/appbar";

const NavigationComponent = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Switch>
                <Route
                    path={"/popout" + routes.DASHBOARD}
                    component={dashboard}
                />
                {/* <Route
                    path={"/popout" + routes.SRDSID}
                    component={SRDSID}
                />
                <Route
                    path={"/popout" + routes.SRDGM}
                    component={SRDGM}
                />
                <Route
                    path={"/popout" + routes.SETUPH}
                    component={SetupMain}
                />
                <Route
                    path={"/popout" + routes.SETUPD}
                    component={SetupData}
                />
                <Route
                    path={"/popout" + routes.TAGCODES}
                    component={SetupTag}
                />
                <Route
                    path={"/popout" + routes.SCANCODES}
                    component={SetupScan}
                />
                <Route
                    path={"/popout" + routes.NEBCODES}
                    component={SetupNeb}
                /> */}
            </Switch>
        </div>
    );

};

export const Popout = NavigationComponent;

