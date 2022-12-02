import * as Mui from '@mui/material';

import { useForm } from "react-hook-form";

import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyIcon from '@mui/icons-material/Key';

// Nazwa użytkownika może składać się z liter alfabetu, liter i znaku podkreślenia _.
// Nazwa użytkownika może mieć maksymalnie 50 znaków.


export function SignUp(props) {
    const { 
        register, 
        handleSubmit,
        reset,
        clearErrors,
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    });


    const onSubmit = (data) => {
        clearErrors();

        props.register(data);
        reset();
    };


    return (
        <Mui.Grid container
            width="80%"
            height="71%"
            margin="3% 11%"
            justifyContent="center"
            alignItems="center"
            >
            <Mui.Grid
                item
                className="field"
                margin="11% auto" 
                justifyContent="center"
                fontSize="15px"
                >
                    <h1>Rejestracja</h1>
            </Mui.Grid>

            <form onSubmit={ handleSubmit(onSubmit) }
                style={({ 
                    'height': '69%',
                    'display': 'grid'
                })}
                >
                <Mui.Grid item className="field">
                    <input type="text" required {...register("username")} />
                    <PersonIcon className="field-icon" />
                    <label>Nazwa użytkownika</label>
                </Mui.Grid>
                <Mui.Grid item className="field">
                    <input type="text" required {...register("email")} />
                    <MailOutlineIcon className="field-icon"/>
                    <label>E-mail</label>
                </Mui.Grid>
                <Mui.Grid item className="field">
                    <input type="password" required {...register("password")} />
                    <KeyIcon className="field-icon" />
                    <label>Hasło</label>
                </Mui.Grid>

                <Mui.Grid item className="field">
                    <button className="button" type="submit">Zarejestruj się</button>
                </Mui.Grid>

            </form>
        </Mui.Grid>
    )
};