import LandingPage from "./routes/Landing";
import ForumPage from "./routes/Forum";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LeftNavbar from "./Navbar";
import { Grid } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: ''
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />

      <Grid container className="App" sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row'
        }}
        >
        <Grid item sx={{ width: '15%', height: '100%' }}>
          <LeftNavbar />
        </Grid>
        <Grid item sx={{ pl: 5, width: '85%', height: '100%' }}>
          <ForumPage />
        </Grid>
      </Grid>

    </ThemeProvider>
  );
}
