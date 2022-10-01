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
            password_confirm: ''
        }
    });


    const onSubmit = (data) => {
        clearErrors();

        axios.post("http://localhost:8000/users/register/", {
                username: data.username,
                email: data.email,
                password: data.password,
                password2: data.password_confirm
            })
             .then(res => {
                if (res.data.tokens) {
                    localStorage.setItem('token', JSON.stringify(res.data[0]));
                    localStorage.setItem('id', JSON.stringify(res.data[1]));
                    props.redirection();
                }
             })
             .catch(err => {
                console.log(err);
                let response =  err.response.data;

                const error_message = (...attribute) => {
                    let [field, response_type] = attribute;
                    setError(field, { type: 'custom', message: response_type });
                };

                
                if (response.username) {
                    error_message('username', response.username);
                }
                if (response.email) {
                    error_message('email', response.email[0]);
                }
                if (response.password) {
                    error_message('password', response.password);
                }
                if (response.password2) {
                    error_message('password_confirm', response.password2);
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

                <label className="register-label">Powtórz hasło: </label>
                <input className="register-input" {...register("password_confirm")} type="password" placeholder="Enter your password" />
                {errors.password_confirm && <p>{errors.password_confirm.message}</p>}


                <button className="register-btn" type="submit"> Zarejestruj sie </button>

            </form>
        </div>
    )
};