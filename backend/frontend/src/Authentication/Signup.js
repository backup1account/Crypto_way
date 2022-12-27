import { useForm } from "react-hook-form";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyIcon from '@mui/icons-material/Key';

import { Grid, Avatar, Typography, FormControl, TextField, InputAdornment, Button } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { blue } from '@mui/material/colors';
import { useState } from 'react';


export function SignUp(props) {
    const { 
        register, 
        handleSubmit,
        reset,
        clearErrors,
        setError,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    });

    const usernameHelperText = "Nazwa użytkownika może składać się z liter alfabetu, cyfr i znaku _.";
    const passwordHelperText = "Hasło może zawierać co najmniej 5 znaków, w tym 1 cyfrę.";

    const [errorVisibility, setErrorVisibility] = useState({
        username: false,
        email: false,
        password: false
    });


    const onSubmit = (data) => {
        setErrorVisibility({
            username: false,
            email: false,
            password: false
        });

        axios.post("http://localhost:8000/users/register/", {
            username: data.username,
            email: data.email,
            password: data.password,
        })
        .then(res => {
            if (res.data.tokens) {
                localStorage.setItem('token', JSON.stringify(res.data.tokens));
                let access_token = JSON.parse(localStorage.getItem('token')).access;

                localStorage.setItem('user_id', jwt_decode(access_token).user_id);
                props.info(jwt_decode(access_token).user_id, access_token);
            }
            })
        .catch(err => {
            let response = err.response.data;

            if (response.username) {
                setError('username', { type: 'custom', message: response.username[0] });

                setErrorVisibility(previous => {
                    return {...previous, username: true};
                });
            } if (response.email) {
                setError('email', { type: 'custom', message: response.email[0] });

                setErrorVisibility(previous => {
                    return {...previous, email: true};
                });
            } if (response.password) {
                setError('password', { type: 'custom', message: response.password[0] });

                setErrorVisibility(previous => {
                    return {...previous, password: true};
                });
            }
        });
        
        reset();
    };


    return (
        <Grid container
            sx={{ 
                width: '100%', 
                height: '60%',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                alignItems: 'center',
                mt: 13,
                paddingY: 5,
            }}
            >

            <Grid item sx={{ pb: 7 }}>
                <Avatar sx={{ mb: 2, ml: 4, bgcolor: blue[400] }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" color="#444444">
                    Rejestracja
                </Typography>
            </Grid>

            <form onSubmit={e => {
                clearErrors();
                handleSubmit(onSubmit)(e);
            }}>

                <Grid item sx={{ pb: 3  }}>
                    <FormControl sx={{ width: '26ch' }}>
                            <TextField
                                error={errorVisibility.username}
                                {...register("username", { required: true })}
                                id="outlined-required1-signup"
                                label="Nazwa użytkownika"
                                helperText={errors.username?.message ? errors.username?.message : usernameHelperText}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" sx={{ paddingLeft: 0.5 }}>
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                />
                        </FormControl>
                </Grid>
                <Grid item sx={{ pb: 1 }}>
                    <FormControl sx={{ width: '26ch' }}>
                        <TextField
                            error={errorVisibility.email}
                            {...register("email", { required: true })}
                            id="outlined-required2-signup"
                            label="E-mail"
                            helperText={errors.email?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" sx={{ paddingLeft: 0.5 }}>
                                        <MailOutlineIcon />
                                    </InputAdornment>
                                ),
                            }}
                            />
                    </FormControl>
                </Grid>
                <Grid item sx={{ pt: 3 }}>
                    <FormControl sx={{ width: '26ch' }}>
                        <TextField
                            error={errorVisibility.password}
                            {...register("password", { required: true })}
                            id="outlined-required3-signup"
                            type="password"
                            label="Hasło"
                            helperText={errors.password?.message ? errors.password?.message : passwordHelperText}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" sx={{ paddingLeft: 0.5 }}>
                                        <KeyIcon />
                                    </InputAdornment>
                                ),
                            }}
                            />
                        </FormControl>
                </Grid>

                <Grid item sx={{ pt: 5 }}>
                    <Button variant="outlined" type="submit" sx={{ width: '23ch', height: '6ch' }}>Zarejestruj się</Button>
                </Grid>

            </form>
        </Grid>
    )
};