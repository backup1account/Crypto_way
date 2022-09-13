import { useState } from "react";

export default function Authorization() {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    let data = { username: username, email: email, password: password };


    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === '' || email === '' || password === '') {
            setSubmitted(false);
            // alert(submitted);
            setError("Nie podano czegos");
        } else {
            setSubmitted(true);

            setUsername("");
            setEmail("");
            setPassword("");
        }

    };


    // add onchange
    return (
        <div className="auth">
            <div className="messages">
                {error}
            </div>

            <div className="auth-form">
                <form>
                    <label className="auth-label">Username: </label>
                    <input className="auth-input" value={username} type="text" onChange={handleUsername} />

                    <label className="auth-label">Email: </label>
                    <input className="auth-input" value={email} type="email" onChange={handleEmail} />

                    <label className="auth-label">Password: </label>
                    <input className="auth-input" value={password} type="password" onChange={handlePassword} />

                    <button className="auth-btn" type="submit" onClick={handleSubmit}> Register </button>

                </form>
            </div>
        </div>
    )

}