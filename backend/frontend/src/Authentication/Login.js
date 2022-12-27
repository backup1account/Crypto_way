import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { Grid, Avatar, Typography, FormControl, TextField, InputAdornment, Button } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { blue } from '@mui/material/colors';


export function LoginUser(props) {
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
            password: '',
            detail: ''
        }
    });

    const [errorVisibility, setErrorVisibility] = useState({
        username: false,
        password: false
    });

    const onSubmit = (data) => {
        setErrorVisibility({
            username: false,
            password: false
        });

        axios.post("http://localhost:8000/users/obtain-token/", {
            username: data.username,
            password: data.password,
        })
        .then(res => {
            if (res.data) {
                localStorage.setItem('token', JSON.stringify(res.data));
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

            } if (response.password) {
                setError('password', { type: 'custom', message: response.password[0] });

                setErrorVisibility(previous => {
                    return {...previous, password: true};
                });
            }

            if (response.detail) {
                setError('detail', { type: 'custom', message: response.detail });
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
                mt: 20,
                paddingY: 5,
            }}
            >

            <Grid item sx={{ pb: 8 }}>
                <Avatar sx={{ mb: 2, ml: 4, bgcolor: blue[400] }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" color="#444444">
                    Logowanie
                </Typography>
            </Grid>

            <form onSubmit={e => {
                clearErrors();
                handleSubmit(onSubmit)(e);
            }}>

                <Grid item sx={{ pb: 4 }}>
                    <FormControl sx={{ width: '26ch' }}>
                        <TextField
                            error={errorVisibility.username}
                            {...register("username", { required: true })}
                            id="outlined-required1"
                            label="Nazwa użytkownika"
                            helperText={errors.username?.message}
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
                <Grid item sx={{ pb: 3 }}>
                    <FormControl sx={{ width: '26ch' }}>
                        <TextField
                            error={errorVisibility.password}
                            {...register("password", { required: true })}
                            id="outlined-required2"
                            type="password"
                            label="Hasło"
                            helperText={errors.password?.message}
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

                <Grid item sx={{ pt: 2 }}>
                    <Button variant="outlined" type="submit" sx={{ width: '23ch', height: '6ch' }}>Zaloguj się</Button>
                </Grid>

                <Typography variant="subtitle1" color="#db1717" sx={{ mt: 3 }}>
                    {errors.detail?.message}
                </Typography>
                
            </form>
        </Grid>
    )
}