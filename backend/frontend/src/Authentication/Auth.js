import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AuthContext = createContext({});

export default AuthContext;


export const AuthProvider = ({children}) => {
    const navigate = useNavigate();

    let [tokens, setTokens] = useState(() => (
        localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
    ));

    let [loading, setLoading] = useState(true);


    let updateToken = async () => {
        console.log('update token called');

        let response = await axios.post('http://localhost:8000/users/refresh-token/', 
            { 
                refresh: tokens['refresh'] 
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        if (response.status === 200) {
            console.log(response);
            console.log('refresh token new');
            setTokens(response.data);
            localStorage.setItem('token', JSON.stringify(response.data));
        } else {
            console.log('something wrong refresh token');
            logoutUser();
        }

        if (loading) {
            setLoading(false);
        }
    };


    let logoutUser = () => {
        setTokens(null);
        localStorage.clear();
        navigate('/auth');
    };

    let contextData = {
        logoutUser: logoutUser,
        updateToken: updateToken,
    };

    useEffect(() => {
        let oneDay = 1000 * 60 * 1440;
        let interval = setInterval(() => {
            if (tokens) { 
                updateToken(); 
            }
        }, oneDay);

        return () => clearInterval(interval);

    }, [tokens, loading]);


    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )

};

