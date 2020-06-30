import React, { useContext } from "react";
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {currentUser, isLoading} = useContext(AuthContext);

    if(isLoading) return <div>Loading...</div>;

    return (
        <Route
            {...rest}
            render={routeProps => (currentUser) ? (<RouteComponent{...routeProps}/>) : (<Redirect to={"/login"} />)}
        />
    )
};

export default PrivateRoute