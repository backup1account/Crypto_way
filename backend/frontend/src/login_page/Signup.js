import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

// DODAĆ DO NAZWY UZYTK. ZE MA BYC TYLKO ALPHANUMERIC

export function SignUp() {
    const { register, handleSubmit, formState: { errors }, clearErrors, getValues } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            password_confirm: ''
        }
    });


    const onSubmit = (data) => {
        // clearErrors();
        // console.log(data);
        axios.post("http://localhost:8000/users/", data)
             .then(res => console.log(res))
             .catch(err => console.log(err));
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
                        message: "Nazwa użytkownika może mieć co wyżej 50 znaków"
                    },
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
                    },
                    maxLength: {
                        value: 150,
                        message: "Adres email powinien mieć co najwyżej 150 znaków"
                    },
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