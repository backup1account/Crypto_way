import { Avatar, Button, Card, CardContent, FormControl, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import styled from "@emotion/styled";
import { blue } from "@mui/material/colors";
import { Box } from "@mui/system";

const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
      borderColor: '#aab7ee',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#aab7ee',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: blue[50],
      },
      '&:hover fieldset': {
        borderColor: blue[500],
      },
      '&.Mui-focused fieldset': {
        borderColor: blue[500],
      },
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: "1px solid #484850",
      }
});


export default function ForumPage() {
    const [discussion, setDiscussion] = useState([]);

    const searchRecordComponent = () => {
        return (<Grid container sx={{
            width: '95%',
            height: 80,
            mt: 5,
            ml: 8
        }}>
            <Grid item sx={{ px: 3 }}>
                <Button variant="outlined" sx={{ px: 3 }} startIcon={<SortIcon />}> Sortuj </Button>
            </Grid>
            <Grid item>
                <Button variant="outlined" sx={{ px: 3 }} startIcon={<FilterListIcon />}> Filtruj </Button>
            </Grid>
            <Grid item>
                {/* TODO: SEARCH BAR LOGIC */}
                <FormControl sx={{ width: '40ch', mx: 3, justifyContent: 'center' }}>
                    <CustomTextField size='small'
                        id="search-bar"
                        InputProps={{
                            placeholder: "Szukaj po frazach...", 
                            style: { height: 36, color: '#66d6ff' },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="primary" fontSize="small" />
                                </InputAdornment>
                            )
                        }}
                        />
                </FormControl>
            </Grid>
            <Grid item>
                <Button variant="contained" sx={{ px: 3 }}> Wyszukaj </Button>
            </Grid>
        </Grid>)
    };
        
    // add num of comments

    let fetchData = () => {
        axios.get(`http://localhost:8000/forum_details/discussions/`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).access}`
            }
        })
        .then(res => {
            setDiscussion([]);
            // console.log(res.data);

            (res.data).forEach(element => {

                let newElement = {
                    'topic': element.topic,
                    'description': element.description,
                    'likes': element.likes,
                    'link': element.link,
                    'date_created': element.date_created,
                    'author': {
                        'id': element.author,
                        'name': '',
                        'avatar': ''
                    }
                };

                setDiscussion(prev => [...prev, newElement]);
            });

        })
        .catch(err => console.log(err))
    };

    useEffect(() => {
        console.log("wanna fetch data once");
        fetchData();
    }, []);

    return (
        <Grid container
            sx={{ 
                width: '100%', 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
            >

            {searchRecordComponent()}

            <Grid container sx={{ 
                width: '100%',
                height: '100%',
                mt: 1,
                justifyContent: 'center',
            }}
            >
                <Grid item sx={{
                    width: '55%',
                    height: '100%',
                    px: 2
                    }}
                    >
                        <Typography variant="h6" color="#444444"> Wyniki - to wywalic? </Typography>

                        <Card sx={{ width: '100%', height: '100%', border: '1px solid red', px: 1 }}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    tytuł
                                </Typography>
                                
                                <Typography variant="body2" color="text.secondary">
                                    well meaning and kindly. opis.
                                </Typography>

                                <Grid container
                                    direction="row"
                                    alignItems="center"
                                    sx={{ mt: 1 }}
                                    >
                                    <Grid item>
                                        <Avatar sx={{ height: '27px', width: '27px' }}>
                                            <img alt="" width="100%" height="100%" style={{'objectFit': 'fill'}} src=""></img>
                                        </Avatar>
                                    </Grid>

                                    <Grid item>
                                        <Typography sx={{ fontSize: 14, pl: 1 }} color="text.secondary" gutterBottom>
                                            nazwa
                                        </Typography>
                                    </Grid>

                                    <Grid item sx={{ mx: 1 }}>
                                        <Box
                                            component="span"
                                            sx={{ display: 'inline-block', transform: 'scale(0.8)' }}
                                        > 
                                            •
                                        </Box>
                                    </Grid>

                                    <Grid item>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            data tu
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>

                </Grid>

                <Grid item sx={{ 
                    width: '30%',
                    height: '80%',
                    mt: 10,
                    ml: 6,
                    backgroundColor: 'yellow' 
                    }}
                    >
                        latest
                </Grid>
            </Grid>
        </Grid>
        // <div>
        //     <h1>Forum here</h1>
        //     <div>
        //         {discussion.length > 0 &&
        //             (discussion.map(element => (
        //                 <p key={element.link}>{element.topic}</p>
        //             )))
        //         }
        //     </div>
        // </div>
    )
}