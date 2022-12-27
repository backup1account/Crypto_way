import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './Authentication/Auth';

import { Box, Drawer, Toolbar, Grid, Avatar, Typography, Divider, IconButton, 
    List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings';

import DashboardIcon from '@mui/icons-material/Dashboard';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ForumIcon from '@mui/icons-material/Forum';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

const drawerWidth = 260;

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

            <Divider sx={{ bgcolor: "primary.light", mt: 4 }} />

            <List sx={{ pl: 2, pt: 3 }}>
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

            <Box sx={{ mt: 53 }}>
                <Divider sx={{ bgcolor: "primary.light" }} />

                <ListItem sx={{ pl: 2 }} key='settings' disablePadding component={Link} to="/settings">
                    <ListItemButton>
                        <ListItemIcon sx={{ color: 'gray' }}> <SettingsIcon /> </ListItemIcon>
                        <ListItemText primary="Ustawienia" />
                    </ListItemButton>
                </ListItem>

                <Divider sx={{ bgcolor: "primary.light", mb: 2 }} />
                
                <Grid container sx={{ mt: 1 }}
                    direction="row"
                    alignItems="center"
                    >
                    <Avatar sx={{ ml: 3 }}>
                        <img alt="" width="100%" height="100%" style={{'objectFit': 'fill'}} src={user.image}></img>
                    </Avatar>
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