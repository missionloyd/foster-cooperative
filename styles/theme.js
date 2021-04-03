import { createMuiTheme } from '@material-ui/core/styles';
import { red, grey } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff',
      main: '#515fa8',
      dark: '#000'
    },
    secondary: {
      main: '#f44336',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    grey,
  },
});

export default theme;
