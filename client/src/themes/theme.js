import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans" bold regular',
    fontSize: 18,
    h1: {
      // could customize the h1 variant as well
    },
    palette: {
      primary: {
        main: '#3A8DFF',
      },
      secondary: {
        main: '#808080',
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#fff',
      },
    },
  },
});

export default theme;
