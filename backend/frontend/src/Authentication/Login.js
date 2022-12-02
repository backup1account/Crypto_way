import * as Mui from '@mui/material';

import { useForm } from "react-hook-form";

import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';

import './LoginRegister.css';


export function LoginUser(props) {
    const { 
        register,
        handleSubmit,
        reset,
        clearErrors,
    } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });


    const onSubmit = (data) => {
        clearErrors();

        props.login(data);
        reset();
    };

    return (
        <Mui.Grid container
            width="80%"
            height="58%"
            margin="10% 11%"
            justifyContent="center"
            alignItems="center"
            >
            <Mui.Grid 
                item 
                className="field" 
                margin="12% auto" 
                justifyContent="center"
                fontSize="15px"
                >
                <h1>Logowanie</h1>
            </Mui.Grid>

            <form onSubmit={ handleSubmit(onSubmit) }
                style={({ 
                    'height': '68%',
                    'display': 'grid'
                })}
                >

                <Mui.Grid item className="field">
                    <input type="text" required {...register("username")} />
                    <PersonIcon className="field-icon" />
                    <label>Nazwa użytkownika</label>
                </Mui.Grid>
                <Mui.Grid item className="field">
                    <input type="password" required {...register("password")} />
                    <KeyIcon className="field-icon" />
                    <label>Hasło</label>
                </Mui.Grid>

                <Mui.Grid item className="field">
                    <button className="button" type="submit">Zaloguj się</button>
                </Mui.Grid>
                
            </form>
        </Mui.Grid>
    )
}