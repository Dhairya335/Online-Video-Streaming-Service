/* eslint-disable react/prop-types */
/* eslint-disable-line */
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { UseAuthListener } from "../hooks";

export function RequireAuth({user, children, ...restProps}){
    const authUser = UseAuthListener();
    const location = useLocation();

    <Route
            {...restProps}
            render = {({ location }) => {
                if(user) {
                    return children;
                }

                if(!user){
                    return <Navigate to={{
                        pathname: 'signin',
                        state: { from: location },
                    }}
                />
                } 
                return null; 
            }}        
        />
    if(!authUser){
        return <Navigate to="/" state={{from: location}} replace/>
    }
    return children;
}

export function IsUserRedirect({ user, loggedInPath, children, ...restProps }){
    console.log(user);
    return (
        <Routes>
            <Route
                {...restProps}
                render = {() => {
                    if(!user) {
                       return {children};
                    }
                    if(user) {
                        return ( 
                            <Navigate to={{pathname: loggedInPath}}/>
                        );
                    }
                    return null; // if any condition is not satisfied
                }}
            />
        </Routes>
    );
}

export function ProtectedRoute({ user, children, ...restProps}){
    return (
        <Routes>
            <Route
                {...restProps}
                render = {({ location }) => {
                    if(user) {
                        return children;
                    }

                    if(!user){
                        return <Navigate to={{
                            pathname: 'signin',
                            state: { from: location },
                        }}
                    />
                    } 
                    return null; 
                }}        
            />
        </Routes>
    )
}

