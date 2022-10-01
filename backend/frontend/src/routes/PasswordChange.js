import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import jwt_decode from "jwt-decode";

// temp

export default function PasswordChange() {
    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm({
        defaultValues: {
            old_password: '',
            new_password: '',
            new_password_confirm: ''
        }
    });


    const onSubmit = (data) => {
        const access_token = JSON.parse(localStorage.getItem('token')).access;
        const user_id = jwt_decode(access_token).user_id;

        clearErrors();

        axios.patch(`http://localhost:8000/users/update-password/${user_id}/`, 
            {
                old_password: data.old_password,
                new_password: data.new_password,
                new_password2: data.new_password_confirm
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
                // dodac diva z wiadomoscia ze pomyslnie zmieniono haslo
                
             })
             .catch(err => {
                console.log(err);
                let response = err.response.data;

                const error_message = (...attribute) => {
                    let [field, response_type] = attribute;
                    setError(field, { type: 'custom', message: response_type });
                };
                
                if (response.old_password) {
                    error_message('old_password', response.old_password);
                }
                if (response.new_password) {
                    error_message('new_password', response.new_password);
                }
                if (response.new_password2) {
                    error_message('new_password_confirm', response.new_password2);
                }

             });

            reset();
    };

    return (
        <div>
            <Link to="/">Powrót na stronę główną</Link>
            <h1>Profile settings page</h1>
            <h2>Zmiana hasła</h2>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <div>
                    <label className="change-label">Wprowadź stare haslo:</label>
                    <input className="change-input" {...register("old_password")} type="password" placeholder="Enter your old password" />
                    {errors.old_password && <p>{errors.old_password.message}</p>}
                </div>

                <div>
                    <label className="change-label">Wprowadź nowe haslo: </label>
                    <input className="change-input" {...register("new_password")} type="password" placeholder="Enter your new password" />
                    {errors.new_password && <p>{errors.new_password.message}</p>} 
                </div>

                <div>
                    <label className="change-label">Wprowadź ponownie nowe haslo: </label>
                    <input className="change-input" {...register("new_password_confirm")} type="password" placeholder="Enter your new password again" />
                    {errors.new_password_confirm && <p>{errors.new_password_confirm.message}</p>} 
                </div>

                <button className="change-btn" type="submit"> Potwierdź zmianę danych </button>

            </form>
        </div>
    )
}