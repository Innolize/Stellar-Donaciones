import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#002E25',
    },
    secondary: {
      main: '#008060',
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
