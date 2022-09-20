import { useState } from "react";

import { LoginUser } from "./Login";
import { SignUp } from "./Signup";


export default function Authorization() {
    const [loginPage, setLoginPage] = useState(true);
    const [registerPage, setRegisterPage] = useState(false);


    // dodac wyczyszczenie inputow po kliknieciu ktorgos z przyciskow (zmiana z logowania na rejestracje)
    return (
        <div className="auth">
            <div className="auth-form">
                { registerPage ? SignUp() : LoginUser() }
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