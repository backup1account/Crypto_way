import * as Mui from '@mui/material';

import { useForm } from "react-hook-form";

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

            <Mui.Grid item sx={{ pb: 12 }}>
                <Mui.Avatar sx={{ mb: 2, ml: 4, bgcolor: blue[400] }}>
                    <LockOutlinedIcon />
                </Mui.Avatar>
                <Mui.Typography component="h1" variant="h5" color="#444444">
                    Logowanie
                </Mui.Typography>
            </Mui.Grid>

            <form onSubmit={ handleSubmit(onSubmit) }>

                <Mui.Grid item sx={{ pb: 4 }}>
                    <Mui.FormControl sx={{ width: '26ch' }}>
                        <Mui.TextField
                            id="outlined-required1"
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
                <Mui.Grid item sx={{ pb: 3 }}>
                    <Mui.FormControl sx={{ width: '26ch' }}>
                        <Mui.TextField
                            id="outlined-required2"
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

                <Mui.Grid item sx={{ pt: 2 }}>
                    <Mui.Button variant="outlined" type="submit" sx={{ width: '23ch', height: '6ch' }}>Zaloguj się</Mui.Button>
                </Mui.Grid>
                
            </form>
        </Mui.Grid>
    )
}