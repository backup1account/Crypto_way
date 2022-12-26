import * as Mui from '@mui/material';

import { useContext, useState } from "react";
import AuthContext from "./Auth";

import { LoginUser } from "./Login";
import { SignUp } from "./Signup";

import { Button, FormHelperText } from '@mui/material';

import './AuthPage.css';


export default function Authorization() {
    const [loginPage, setLoginPage] = useState(true);
    const [registerPage, setRegisterPage] = useState(false);

    let { loginUser, registerUser, errorMessages } = useContext(AuthContext);

    let checkTextHelper = () => {
        let helperText = '';

        if (loginPage) {
            helperText = <FormHelperText sx={{ textAlign: 'center' }}>
                            Nie masz konta?
                            <Button variant="text"
                                onClick={(e) => {
                                    e.preventDefault();
                                    loginPage ? setLoginPage(false) : setLoginPage(true);
                                    registerPage ? setRegisterPage(false) : setRegisterPage(true);
                                }}
                                >
                                    Zarejestruj się
                            </Button>
                        </FormHelperText>;
        }
        else {
            helperText = <FormHelperText sx={{ textAlign: 'center' }}>
                            Masz już konto?
                            <Button variant="text"
                                onClick={(e) => {
                                    e.preventDefault();
                                    loginPage ? setLoginPage(false) : setLoginPage(true);
                                    registerPage ? setRegisterPage(false) : setRegisterPage(true);
                                }}
                                >
                                    Zaloguj się
                            </Button>
                        </FormHelperText>;
        }

        return helperText;
    };


    return (
        <Mui.Box className="BoxWrapper">
            <Mui.Grid container className="UserActionContainer">
                <Mui.Grid item>

                    <Mui.Grid item>
                        { registerPage ? <SignUp register={registerUser} />
                            : <LoginUser login={loginUser} /> }
                    </Mui.Grid>
                
                    <Mui.Grid 
                        item
                        alignItems="center" 
                        fontSize="13px"
                        >
                            {checkTextHelper()}
                    </Mui.Grid>

                </Mui.Grid>
            </Mui.Grid>
        </Mui.Box>
    )
}