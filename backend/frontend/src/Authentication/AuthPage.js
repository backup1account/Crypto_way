import { useContext, useState } from "react";
import AuthContext from "./Auth";

import { LoginUser } from "./Login";
import { SignUp } from "./Signup";

import { Button, FormHelperText, Box, Grid } from '@mui/material';


export default function Authorization() {
    const [loginPage, setLoginPage] = useState(true);
    const [registerPage, setRegisterPage] = useState(false);

    let { getUser } = useContext(AuthContext);

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
        <Box className="BoxWrapper" sx={{ width: '100%', height: '100%' }}>
            <Grid container className="UserActionContainer" sx={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                <Grid item>

                    <Grid item>
                        { registerPage ? <SignUp info={getUser} />
                            : <LoginUser info={getUser} /> }
                    </Grid>
                
                    <Grid 
                        item
                        alignItems="center" 
                        fontSize="13px"
                        >
                            {checkTextHelper()}
                    </Grid>

                </Grid>
            </Grid>
        </Box>
    )
}