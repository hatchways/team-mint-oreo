import { makeStyles } from '@material-ui/core/styles';

const defaultColor = '#2598EC';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    background: 'linear-gradient(#4098EC 40%, #99C6FF 90%)',
    color: '#FFF',
    alignItems: 'center',
    display: 'flex',
    // flexDirection: 'column'
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    // backgroundRepeat: 'no-repeat',
    // backgroundColor:
    //   theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
  },
  converseBox: {
    width: '80%',
    height: '40%',
    textAlign: 'center',
    margin: theme.spacing(12),
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    height: '100%',
    width: '70%',
    // margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainContent: {
    margin: theme.spacing(6, 4, 6),
    padding: theme.spacing(0, 6),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  rememberMe: {
    fontSize: 14,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1, 5, 1),
    fontSize: 14,
    backgroundColor: defaultColor,
    textTransform: 'none',
  },
  createAccount: {
    justifyContent: 'right',
    margin: theme.spacing(4, 4, 6),
    display: 'inline-flex',
  },
  accountText: {
    padding: theme.spacing(1, 3, 0),
    fontSize: 13,
    color: '#bdbdbd',
  },
  switch: {
    backgroundColor: 'white',
    fontSize: 12,
    padding: theme.spacing(1, 2, 1),
    color: defaultColor,
    textTransform: 'none',
  },
  label: {
    fontSize: 16,
    '&$focusedLabel': {
      color: defaultColor,
    },
  },
  focusedLabel: {},
  underline: {
    '&:after': {
      borderBottom: '2px solid ' + defaultColor,
    },
  },
}));

export { useStyles };
