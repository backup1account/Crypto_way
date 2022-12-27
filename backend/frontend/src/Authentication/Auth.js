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

    let [user, setUser] = useState(() => (
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    ));

    let [loading, setLoading] = useState(true);


    let updateToken = async () => {
        let response = await axios.post('http://localhost:8000/users/refresh-token/', { 
                refresh: tokens['refresh'] 
            }, 
            { headers: {
                    'Content-Type': 'application/json'
                }
            });

        if (response.status === 200) {
            console.log('Refresh token obtained successfully');
            setTokens(response.data);
            localStorage.setItem('token', JSON.stringify(response.data));
        } else {
            console.log('Something went wrong with refresh token');
            logoutUser();
        }

        if (loading) {
            setLoading(false);
        }
    };


    let getUser = (...args) => {
        let [id, access_token] = args;

        axios.get(`http://localhost:8000/users/${id}/`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(res => {
            console.log(res.data);
            if (res.data) {
                localStorage.setItem('user', JSON.stringify(res.data));
                setUser(JSON.parse(localStorage.getItem('user')));

                setTimeout(() => window.location.reload(), 700);
            }
        })
        .catch(err => console.log(err))
    };


    let changePassword = (data) => {
        axios.patch(`http://localhost:8000/users/update-password/${localStorage.getItem('user_id')}/`, {
                old_password: data.old_password,
                new_password: data.new_password,
                new_password2: data.new_password_confirm
            },
            { 
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).access}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
             .then(res => {
                console.log(res);
                // dodac diva z wiadomoscia ze pomyslnie zmieniono haslo
                
             })
             .catch(err => {
                console.log(err);
             });
    };


    let changeUser = (data) => {
        // ZMIENIC PRZESYLANY OBIEKT NA FORMDATA !
        axios.patch(`http://localhost:8000/users/update-user/${localStorage.getItem('user_id')}/`, {
                username: data.new_username,
                email: data.new_email,
                first_name: data.new_first_name,
                image: data.new_image // ZMIENIC DOZWOLONE FORMATY, PROBLEM Z PRZESLANIEM PLIKU
            },
            { 
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).access}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
             .then(res => {
                console.log(res);
                getUser(localStorage.getItem('user_id'), JSON.parse(localStorage.getItem('token')).access);
                // dodac diva z wiadomoscia ze pomyslnie zmieniono dane       
             })
             .catch(err => {
                console.log(err);
             });
    };



    let logoutUser = () => {
        setTokens(null);
        setUser(null);
        localStorage.clear();
        navigate('/auth');
    };


    let contextData = {
        userInformation: [user, setUser],
        changePassword: changePassword,
        changeUser: changeUser,
        getUser: getUser,
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
