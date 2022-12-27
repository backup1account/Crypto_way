import LandingPage from "./routes/Landing";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LeftNavbar from "./Navbar";

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

      <div className="App">
        <div >
          <LeftNavbar />
        </div>

        {/* <div>
        <LandingPage />
        </div> */}
      </div>

    </ThemeProvider>
  );
}
