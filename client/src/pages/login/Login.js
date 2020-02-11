import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
    alignItems: 'left',
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
  input: {
    color: defaultColor,
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid container xs={false} sm={4} md={5} className={classes.image}>
        <Box mx="auto" className={classes.converseBox}>
          <TextsmsOutlinedIcon fontSize="large" />
          <Typography variant="h6">
            Converse with anyone
            <br />
            with any language
          </Typography>
        </Box>
      </Grid>
      <Grid
        container
        xs={12}
        sm={8}
        md={7}
        component={Paper}
        elevation={6}
        className={classes.alignCenter}
        square
      >
        <div className={classes.paper}>
          <Grid container className={classes.createAccount}>
            <Grid className={classes.accountText}>Don't have an account?</Grid>
            <Button type="submit" variant="contained" color="primary" className={classes.switch}>
              Create Account
            </Button>
          </Grid>
          <Grid container className={classes.mainContent}>
            <Grid container alignItems="left">
              <Typography component="h1" variant="h5">
                Welcome Back!
              </Typography>
            </Grid>
            <form className={classes.form} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                    focused: classes.focusedLabel,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.underline,
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                    focused: classes.focusedLabel,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.underline,
                  },
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={<Typography class={classes.rememberMe}>Remember Me</Typography>}
              />
              <Grid container className={classes.alignCenter}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </div>
      </Grid>
    </Container>
  );
}
