import { Route, Redirect } from "react-router-dom";
import React from "react";
import jwtDecode from "jwt-decode"
import { history } from "../configurations/browser-history.config";
import { ProtectedRouteProps } from "../interfaces/routes/protected-route-props.view";
import { LocalStorageService } from "../services/local-storage.service";
const localStorageService = new LocalStorageService();

const OnlyAdminPrivateRoute = (props: ProtectedRouteProps) => {
    let isAdmin = false;
    const { component: Component, ...rest } = props;
    const token = localStorageService.getItem(`${process.env.REACT_APP_LOCAL_STORAGE_TOKEN}`);
    const decodeToken = JSON.parse(JSON.stringify(jwtDecode(token)));
    const userRoles = decodeToken['roles'];
    userRoles.forEach((element: string) => {
        if (element === 'admin') {
            isAdmin = true;
        }
    });
    history.push(`${props.location?.pathname}`);
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                isAdmin ? (
                    <Component {...routeProps} />
                ) : (
                        <Redirect
                            to={{
                                pathname: process.env.REACT_APP_LOGIN_PAGE,
                                state: { from: routeProps.location }
                            }}
                        />
                    )
            }
        />
    );
};

export default OnlyAdminPrivateRoute;