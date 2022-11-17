import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { HeaderContainer } from '../containers/header';
import { FooterContainer } from '../containers/footer';
import { FirebaseContext } from '../context/firebase';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
// import * as ROUTES from '../constants/routes';
import { Form } from "../components";

export default function Signin(){
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { firebase } = useContext(FirebaseContext);
    const { setAuth } = useAuth();
    const LOGIN_URL = '/signin';
    const isInvalid = password === '' || emailAddress === '';
    const handleSignin = async (event) => {
        event.preventDefault();

        try{
            const response = await axios.post(
                JSON.stringify({ emailAddress, password}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ emailAddress, password, roles, accessToken });
            setEmailAddress('');
            setPassword('');
            navigate(from, {replace: true });
        }

        catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
        firebase
            .auth() 
            .signInWithEmailAndPassword(emailAddress, password)
            .then(() => {
                //push to the browse page
                navigate("/browse");
            });
        // firebase work here!
        
        .catch((error)) => {
                setEmailAddress('');
                setPassword('')
                setError(error.message);
        };
    }
    return(
        <>
            <HeaderContainer>
                <Form>
                    <Form.Title>Sign In</Form.Title>
                    {error && <Form.Error>{error}</Form.Error>}

                    <Form.Base onSubmit={handleSignin} method='post'>
                        <Form.Input 
                            placeholder="Email address" 
                            value={emailAddress}
                            onChange={({ target }) => setEmailAddress(target.value)}>
                        </Form.Input>

                        <Form.Input 
                            type="password"
                            placeholder="Password" 
                            autoComplete="off"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}>
                        </Form.Input>

                        <Form.Submit disabled={isInvalid} type="submit">
                            Sign In
                        </Form.Submit>
                    </Form.Base>

                    <Form.Text>
                        New to Netflix? <Form.Link to="/signup">Sign up now.</Form.Link>
                    </Form.Text>
                    <Form.TextSmall>
                        This page is protected by Google reCAPTCHA to ensure
                        you're not a bot. Learn more.
                    </Form.TextSmall>
                </Form>
                Hello from signin!
            </HeaderContainer>
            <FooterContainer />
        </> 
    )
};
