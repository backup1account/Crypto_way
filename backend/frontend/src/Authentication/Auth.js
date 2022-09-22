import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoginUser } from "./Login";
import { SignUp } from "./Signup";


export default function Authorization() {
    const [loginPage, setLoginPage] = useState(true);
    const [registerPage, setRegisterPage] = useState(false);

    const navigate = useNavigate();

    const redirection = () => {
        navigate('/');
    };


    return (
        <div className="auth">
            <div className="auth-form">
                { registerPage ? <SignUp redirection={redirection} /> 
                    : <LoginUser redirection={redirection} /> }
            </div>
            <div className="auth-options">
                <button onClick={() => {
                    setLoginPage(true); 
                    setRegisterPage(false);
                }}> Tu div sie logowanie </button>
                <button onClick={() => {
                    setLoginPage(false); 
                    setRegisterPage(true);
                }}> Tu div sie zarejestruj </button>
            </div>
        </div>
    )

}