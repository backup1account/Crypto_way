import { useForm } from "react-hook-form";
import axios from "axios";


export function LoginUser(props) {
    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors },
        clearErrors,
    } = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const onSubmit = (data) => {
        clearErrors();

        axios.post("http://localhost:8000/users/obtain-token/", {
                username: data.username,
                password: data.password,
            })
             .then(res => {
                if (res.data) {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    props.redirection();
                }
                
             })
             .catch(err => {
                console.log(err);
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
                // console.log(err.config);
             });

            reset();
    };

    return (
        <div className="login-form">
            <h1>Logowanie</h1>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <label className="login-label">Nazwa: </label>
                <input className="login-input" {...register("username", { 
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

                <div className="login-errors"> 
                    {errors.username && <p>{errors.username.message}</p>} 
                </div>


                <label className="login-label">Hasło: </label>
                <input className="login-input" {...register("password", { 
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

                <div className="login-errors"> 
                    {errors.password && <p>{errors.password.message}</p>} 
                </div>

                <button className="login-btn" type="submit"> Zaloguj sie </button>
                <div className="login-server-error">

                </div>
            </form>
        </div>
    )
}