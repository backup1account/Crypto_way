import { useForm } from "react-hook-form";
// import axios from "axios";


export function LoginUser(props) {
    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    });


    const onSubmit = (data) => {
        clearErrors();

        props.login(data);

            //  .catch(err => {
            //     console.log(err);
            //     if (err.response.data.detail) {
            //         setError('password', { type: 'custom', message: err.response.data.detail });
            //     }
            //  });

            reset();
    };

    return (
        <div className="login-form">
            <h1>Logowanie</h1>
            <form onSubmit={ handleSubmit(onSubmit) }>

                <label className="login-label">Nazwa: </label>
                <input className="login-input" {...register("username")} placeholder="Enter your username" />

                <label className="login-label">Hasło: </label>
                <input className="login-input" {...register("password")} type="password" placeholder="Enter your password" />
                {errors.password && <p>{errors.password.message}</p>} 

                <button className="login-btn" type="submit"> Zaloguj sie </button>
                
            </form>
        </div>
    )
}