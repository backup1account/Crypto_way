import { useForm } from "react-hook-form";

// POPRAWIC WARUNKI WALIDACJI NA TAKIE JAK W REJESTRACJI

export function LoginUser() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const onSubmit = (data) => console.log(data);

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
                        value: 35,
                        message: "Nazwa użytkownika może mieć co wyżej 35 znaków"
                    },
                })} placeholder="Enter your username" />
                {errors.username && <p>{errors.username.message}</p>}


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
                    validate: value => /\d/.test(value) || "Hasło powinno posiadać co najmniej 1 cyfrę"
                })} placeholder="Enter your password" />
                {errors.password && <p>{errors.password.message}</p>}

                <button className="login-btn" type="submit"> Zaloguj sie </button>
            </form>
        </div>
    )
}