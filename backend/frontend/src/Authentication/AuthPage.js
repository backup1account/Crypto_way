import * as Mui from '@mui/material';

import { useContext, useEffect, useState } from "react";
import AuthContext from "./Auth";

import video from '../resources/jellyfish2.mp4';

import { LoginUser } from "./Login";
import { SignUp } from "./Signup";

import './AuthPage.css';


export default function Authorization() {
    const [loginPage, setLoginPage] = useState(true);
    const [registerPage, setRegisterPage] = useState(false);

    let { loginUser, registerUser, errorMessages } = useContext(AuthContext);

    return (
        <Mui.Box className="BoxWrapper">
            <Mui.Grid container className="UserActionContainer">

                <Mui.Grid item width="45%" height="100%">
                    <video width="100%" height="100%" autoPlay muted loop
                        style={({ 
                            'objectFit': 'cover', 
                            'borderRadius': '42px',
                            'opacity': '67%'
                        })}
                        >
                        <source src={video} type="video/mp4" />
                    </video>
                </Mui.Grid>

                <Mui.Grid item width="55%" margin="5% 0">
                        { registerPage ? <SignUp register={registerUser} />
                        : <LoginUser login={loginUser} /> }
                
                    <Mui.Grid 
                        item 
                        className="field"
                        justifyContent="center" 
                        fontSize="13px"
                        >
                            <p style={({
                                'width': '220px',
                                'paddingLeft': '5%',
                                })}
                                >
                                Nie masz konta?
                                <a href="" style={{paddingLeft: '3%'}}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        loginPage ? setLoginPage(false) : setLoginPage(true);
                                        registerPage ? setRegisterPage(false) : setRegisterPage(true);
                                    }}
                                >Zarejestruj się</a>
                            </p>
                    </Mui.Grid>
                </Mui.Grid>
                {errorMessages} 
                {/* TODO: display errors better */}
            </Mui.Grid>
        </Mui.Box>
    )
}