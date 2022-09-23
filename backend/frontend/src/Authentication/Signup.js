import { useForm } from "react-hook-form";
import axios from "axios";

// Nazwa użytkownika może składać się z liter alfabetu, liter i znaku podkreślenia _.
// Nazwa użytkownika może mieć maksymalnie 50 znaków.


export function SignUp(props) {
    const { 
        register, 
        handleSubmit,
        reset,
        formState: { errors }, 
        clearErrors,
        setError,
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        }
    });



    const onSubmit = (data) => {
        clearErrors();

        axios.post("http://localhost:8000/users/register/", {
                username: data.username,
                email: data.email,
                password: data.password,
            })
             .then(res => {
                if (res.data.tokens) {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    props.redirection();
                }
             })
             .catch(err => {
                console.log(err);

                if (err.response.data.username) {
                    setError('username', { type: 'custom', message: err.response.data.username });
                } 
                if (err.response.data.email) {
                    setError('email', { type: 'custom', message: err.response.data.email[0] });
                } 
                if (err.response.data.password) {
                    setError('password', { type: 'custom', message: err.response.data.password });
                }

                // pozniej zakomentowac
                if (err.response) {
                    console.log({
                        'error status': err.response.status,
                        'error headers': err.response.headers 
                    });
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log('Error message: ', err.message);
                }
             });

            reset();
    };


    return (
        <div className="register-form">
            <h1>Rejestracja</h1>
            <form onSubmit={ handleSubmit(onSubmit) }>

                <label className="register-label">Nazwa: </label>
                <input className="register-input" {...register("username")} placeholder="Enter your username" />
                {errors.username && <p>{errors.username.message}</p>}

                <label className="register-label">Email: </label>
                <input className="register-input" {...register("email")} placeholder="Enter your email" />
                {errors.email && <p>{errors.email.message}</p>}


                <label className="register-label">Hasło: </label>
                <input className="register-input" {...register("password")} type="password" placeholder="Enter your password" />
                {errors.password && <p>{errors.password.message}</p>}


                <button className="register-btn" type="submit"> Zarejestruj sie </button>

            </form>
        </div>
    )
};