import { useForm } from "react-hook-form";
import axios from "axios";


export function SignUp() {

    const { 
        register, 
        handleSubmit,
        reset,
        formState: { errors }, 
        clearErrors, 
        getValues 
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            password_confirm: ''
        }
    });


    const onSubmit = (data) => {
        // clearErrors();
        axios.post("http://localhost:8000/users/register/", {
                username: data.username,
                email: data.email,
                password: data.password,
            })
             .then(res => {
                console.log(res.data.tokens);
                if (res.data.tokens) {
                    localStorage.setItem('user', JSON.stringify(res.data));
                }
             })
             .catch(err => {
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
                console.log(err.config);
             });

            reset();
    };


    return (
        <div className="register-form">
            <h1>Rejestracja</h1>
            <form onSubmit={ handleSubmit(onSubmit) }>

                <label className="register-label">Nazwa: </label>
                <input className="register-input" {...register("username", { 
                    required: {
                        value: true,
                        message: "Nie wypełniono pola"
                    },
                    maxLength: {
                        value: 50,
                        message: "Nazwa powinna składać się z co najwyżej 50 znaków"
                    },
                    pattern: {
                        value: /^[a-zA-Z0-9_]*$/,
                        message: "Nazwa może składać się z jedynie z liter alfabetu, liczb oraz znaku _"
                    }
                })} placeholder="Enter your username" />
                {errors.username && <p>{errors.username.message}</p>}


                <label className="register-label">Email: </label>
                <input className="register-input" {...register("email", { 
                    required: {
                        value: true,
                        message: "Nie wypełniono pola"
                    },
                    pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Wprowadzono niepoprawny email"
                    }
                })} placeholder="Enter your email" />
                {errors.email && <p>{errors.email.message}</p>}


                <label className="register-label">Hasło: </label>
                <input className="register-input" {...register("password", { 
                    required: {
                        value: true,
                        message: "Nie wypełniono pola"
                    },
                    setValueAs: value => value.toString(),
                    minLength: {
                        value: 5,
                        message: "Hasło powinno się składać z co najmniej 5 znaków"
                    },
                    validate: value => /\d/.test(value) || "Hasło powinno się składać z co najmniej 1 liczby"
                })} type="password" placeholder="Enter your password" />
                {errors.password && <p>{errors.password.message}</p>}


                <label className="register-label">Powtórz hasło: </label>
                <input className="register-input" {...register("password_confirm", { 
                    required: {
                        value: true,
                        message: "Wprowadź ponownie hasło"
                    },
                    setValueAs: value => value.toString(),
                    validate: value => value === getValues("password") || "Hasło nie jest takie samo jak wprowadzone wcześniej"
                })} type="password" placeholder="Confirm your password" />
                {errors.password_confirm && <p>{errors.password_confirm.message}</p>}

                <button className="register-btn" type="submit"> Zarejestruj sie </button>

            </form>
        </div>
    )
};