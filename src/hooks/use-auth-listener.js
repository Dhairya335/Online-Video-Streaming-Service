import React, { useState, useEffect, useContext } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { FirebaseContext } from "../context/firebase";
import {Signin, Browse} from '../pages';
import * as ROUTES from '../constants/routes'

export default function UseAuthListener(){

    //We can check if there is a user in localStorage, which means
    // we have to store the user on any action in local Storage such as sign in, sign out
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //To listen from firebase
    const { firebase } = useContext(FirebaseContext);

    //Now we need useEffect that will allow us to run on first iteration
    //of operation. To bind the listener to listen for us.
    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            if(authUser){
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
                // setIsLoggedIn(true);
            
                // <Routes>
                //     <Route
                //         path={ROUTES.BROWSE}
                //         render={({...restProps}) => (
                //             <Browse {...restProps} isLoggedIn={(isLoggedIn) => !isLoggedIn} />
                //         )}

                //         />
                // </Routes>
                // console.log('IsLoggedIn', isLoggedIn);

            }
            else{
                localStorage.removeItem('authUser');
                setUser(null);
                // setIsLoggedIn(false);
                // <Routes>
                //     <Route
                //         // path={ROUTES.SIGN_IN}
                //         render={({...restProps}) => (
                //             <Navigate to={ROUTES.SIGN_IN} {...restProps} isLoggedIn={(isLoggedIn) => !isLoggedIn} />
                //         )}

                //         />
                // </Routes>
                // console.log('IsLoggedIn', isLoggedIn);
                
                
            }
        });

    //Because this is a listener so, we have to clean up the listener
        return () => listener();
    }, []);
    return user;
}