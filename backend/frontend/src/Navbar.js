import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './Authentication/Auth';

import { Box, Drawer, Toolbar, Grid, Avatar, Typography, Divider, IconButton, 
    List, ListItem, ListItemButton, ListItemIcon, ListItemText, Badge, FormControl, TextField, InputAdornment } from '@mui/material';

import { styled } from '@mui/material/styles';

import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings';

import DashboardIcon from '@mui/icons-material/Dashboard';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ForumIcon from '@mui/icons-material/Forum';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import SearchIcon from '@mui/icons-material/Search';
import { blue } from '@mui/material/colors';

const drawerWidth = 255;

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
        borderRadius: '50px'
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
        borderRadius: "50px"
      }
});


export default function LeftNavbar() {
    let { logoutUser, userInformation } = useContext(AuthContext);
    let [ user ] = userInformation;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { 
                    width: drawerWidth, 
                    boxSizing: 'border-box', 
                    backgroundColor: 'linear-gradient(145deg, #050b24, #060d2b)',
                    boxShadow: 'rgb(5 9 29 / 83%) 20px 20px 40px, rgb(21 30 72) -20px -20px 20px'
                },
            }}
        >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
            <Grid container
                direction="column"
                alignItems="center"
                >
                <Avatar sx={{ mb: 1, backgroundColor: '#4d94ff' }}>
                    <CurrencyBitcoinIcon />
                </Avatar>
                <Typography variant="h6" color="#444444">
                    Cryptoway
                </Typography>
            </Grid>

            {/* TODO: SEARCH BAR LOGIC */}
            <FormControl sx={{ width: '25ch', 
                mt: 4, mx: 2,
                backgroundColor: '#0d1640',
                borderRadius: '50px',
                justifyContent: 'center' 
                }}
                >
                <CustomTextField size='small'
                    id="search-bar"
                    InputProps={{
                        placeholder: "Search...",
                        startAdornment: (
                            <InputAdornment position="start" sx={{ color: 'gray' }}>
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                    />
            </FormControl>

            <Divider sx={{ bgcolor: "primary.light", mt: 2.5 }} />

            <List sx={{ pl: 2, pt: 2 }}>
                <ListItem key="dashboard" disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: 'gray' }}>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="ranking" disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: 'gray' }}>
                            <LeaderboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ranking" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="forum" disablePadding component={Link} to="/forum">
                    <ListItemButton>
                        <ListItemIcon sx={{ color: 'gray' }}>
                            <ForumIcon />
                        </ListItemIcon>
                        <ListItemText primary="Forum" />
                    </ListItemButton>
                </ListItem>
            </List>

            <Box sx={{ mt: 50 }}>
                <Divider sx={{ bgcolor: "primary.light" }} />

                <ListItem sx={{ pl: 2 }} key='settings' disablePadding component={Link} to="/settings">
                    <ListItemButton>
                        <ListItemIcon sx={{ color: 'gray' }}> <SettingsIcon /> </ListItemIcon>
                        <ListItemText primary="Ustawienia" />
                    </ListItemButton>
                </ListItem>

                <Divider sx={{ bgcolor: "primary.light", mb: 2 }} />
                
                <Grid container
                    direction="row"
                    alignItems="center"
                    >
                    <Avatar sx={{ ml: 3 }}>
                        <img alt="" width="100%" height="100%" style={{'objectFit': 'fill'}} src={user.image}></img>
                    </Avatar>
                    <Badge badgeContent="" variant='dot'
                        sx={{
                            mt: 3,
                            "& .MuiBadge-badge": {
                                backgroundColor: "lime",
                            }
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                        >
                    </Badge>
                    <Grid item sx={{ ml: 2 }}>
                        <Typography variant="subtitle1" color="">{user.username}</Typography>
                        <Typography variant="subtitle2" color="#444444">{user.email}</Typography>
                    </Grid>
                    <Grid item sx={{ ml: 4, mt: 1}}>
                        <IconButton sx={{ color: 'gray' }} onClick={logoutUser}>
                            <LogoutIcon />
                        </IconButton>

                    </Grid>
                </Grid>
            </Box>

        </Box>
      </Drawer>
    )
}