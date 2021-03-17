import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
import App from './App';

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
    },
    typography: { 
       useNextVariants: true
    }
 });

ReactDOM.render(
    <MuiThemeProvider theme = { theme }>
        <App />
    </MuiThemeProvider>, document.getElementById('root'));