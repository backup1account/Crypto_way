import * as Mui from '@mui/material';

import { useForm } from "react-hook-form";

import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyIcon from '@mui/icons-material/Key';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { blue } from '@mui/material/colors';
import { useContext } from 'react';
import AuthContext from './Auth';

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

    let { errorMessages } = useContext(AuthContext);


    const onSubmit = (data) => {
        clearErrors();

        props.register(data);
        console.log(errorMessages);
        
        reset();
    };


    return (
        <Mui.Grid container
            sx={{ 
                width: '100%', 
                height: '60%',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                alignItems: 'center',
                mt: 20,
                paddingY: 5,
            }}
            >

            <Mui.Grid item sx={{ pb: 8 }}>
                <Mui.Avatar sx={{ mb: 2, ml: 4, bgcolor: blue[400] }}>
                    <LockOutlinedIcon />
                </Mui.Avatar>
                <Mui.Typography component="h1" variant="h5" color="#444444">
                    Rejestracja
                </Mui.Typography>
            </Mui.Grid>

            <form onSubmit={ handleSubmit(onSubmit) }>

                <Mui.Grid item sx={{ pb: 4 }}>
                    <Mui.FormControl sx={{ width: '26ch' }}>
                            <Mui.TextField
                                {...register("username")}
                                id="outlined-required1-signup"
                                label="Nazwa użytkownika"
                                InputProps={{
                                    startAdornment: (
                                        <Mui.InputAdornment position="start" sx={{ paddingLeft: 0.5 }}>
                                            <PersonIcon />
                                        </Mui.InputAdornment>
                                    ),
                                }}
                                />
                        </Mui.FormControl>
                </Mui.Grid>
                <Mui.Grid item sx={{ pb: 1 }}>
                    <Mui.FormControl sx={{ width: '26ch' }}>
                        <Mui.TextField
                            {...register("email")}
                            id="outlined-required2-signup"
                            label="E-mail"
                            InputProps={{
                                startAdornment: (
                                    <Mui.InputAdornment position="start" sx={{ paddingLeft: 0.5 }}>
                                        <MailOutlineIcon />
                                    </Mui.InputAdornment>
                                ),
                            }}
                            />
                    </Mui.FormControl>
                </Mui.Grid>
                <Mui.Grid item sx={{ pt: 3 }}>
                    <Mui.FormControl sx={{ width: '26ch' }}>
                        <Mui.TextField
                            {...register("password")}
                            id="outlined-required3-signup"
                            type="password"
                            label="Hasło"
                            InputProps={{
                                startAdornment: (
                                    <Mui.InputAdornment position="start" sx={{ paddingLeft: 0.5 }}>
                                        <KeyIcon />
                                    </Mui.InputAdornment>
                                ),
                            }}
                            />
                        </Mui.FormControl>
                </Mui.Grid>

                <Mui.Grid item sx={{ pt: 5 }}>
                    <Mui.Button variant="outlined" type="submit" sx={{ width: '23ch', height: '6ch' }}>Zarejestruj się</Mui.Button>
                </Mui.Grid>

            </form>
        </Mui.Grid>
    )
};