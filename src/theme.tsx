import {createMuiTheme} from '@material-ui/core/styles';

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#008000',
      dark: '#808080',
      light: '#FF0000'
    },
  },
  overrides: {
    MuiCardContent: {
      root: {
        marginTop: '15px',
        borderRadius: 10
      }
    }
  },
  typography: {
    h1: {
      fontSize: '20px',
      color: '#fff',
      fontWeight: 'bold'
    }
  }
});

export default Theme;