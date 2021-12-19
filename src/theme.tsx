// import { createTheme } from '@material-ui/core/styles';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#3751FF',
    },
    secondary: {
      main: '#DDE2FF',
      light:'#F7F8FC',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#363740',
    },
  },
  typography: {
    fontFamily: 'Mulish, Arial',
  },
});

export default theme;