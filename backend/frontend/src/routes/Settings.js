import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import jwt_decode from "jwt-decode";


// user information settings
export default function ProfileSettings() {
    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm({
        defaultValues: {
            new_username: '',
            new_email: '',
            new_first_name: ''
        }
    });


    const onSubmit = (data) => {
        const access_token = JSON.parse(localStorage.getItem('token')).access;
        const user_id = jwt_decode(access_token).user_id;

        clearErrors();

        axios.patch(`http://localhost:8000/users/update-user/${user_id}/`, 
            {
                username: data.new_username,
                email: data.new_email,
                first_name: data.new_first_name
            },
            {
                headers: {
                    'authorization': `Bearer ${access_token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
             .then(res => {
                console.log(res);
                // dodac diva z wiadomoscia ze pomyslnie zmieniono dane       
             })
             .catch(err => {
                console.log(err);
                let response = err.response.data;

                const error_message = (...attribute) => {
                    let [field, response_type] = attribute;
                    setError(field, { type: 'custom', message: response_type });
                };
                
                if (response.username) {
                    error_message('new_username', response.username);
                }
                if (response.email) {
                    error_message('new_email', response.email[0]);
                }
                if (response.first_name) {
                    error_message('new_first_name', response.first_name);
                }

             });

            reset();
    };

    return (
        <div>
            <Link to="/">Powrót na stronę główną</Link>
            <h1>Profile settings page</h1>
            <h2>Zmiana danych</h2>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <div>
                    <label className="change-label">Wprowadź nową nazwę użytkownika:</label>
                    <input className="change-input" {...register("new_username")} placeholder="Enter your username" />
                    {errors.new_username && <p>{errors.new_username.message}</p>} 
                </div>

                <div>
                    <label className="change-label">Wprowadź nowy adres e-mail: </label>
                    <input className="change-input" {...register("new_email")} placeholder="Enter your e-mail" />
                    {errors.new_email && <p>{errors.new_email.message}</p>} 
                </div>

                <div>
                    <label className="change-label">Wprowadź swoje imie: </label>
                    <input className="change-input" {...register("new_first_name")} placeholder="Enter your name" />
                    {errors.new_first_name && <p>{errors.new_first_name.message}</p>} 
                </div>

                <button className="change-btn" type="submit"> Potwierdź zmianę danych </button>
            </form>
        </div>
    )
}