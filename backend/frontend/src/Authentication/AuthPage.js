import { useContext, useState } from "react";
import AuthContext from "./Auth";

import { LoginUser } from "./Login";
import { SignUp } from "./Signup";


export default function Authorization() {
    const [loginPage, setLoginPage] = useState(true);
    const [registerPage, setRegisterPage] = useState(false);

    let { loginUser, registerUser } = useContext(AuthContext);


    return (
        <div className="auth">
            <div className="auth-form">
                { registerPage ? <SignUp register={registerUser} />
                    : <LoginUser login={loginUser} /> }
            </div>
            <div className="auth-options">
                <button onClick={() => {
                    setLoginPage(true); 
                    setRegisterPage(false);
                }}> Tu div logowanie </button>
                <button onClick={() => {
                    setLoginPage(false); 
                    setRegisterPage(true);
                }}> Tu div zarejestruj </button>
            </div>
        </div>
    )

}