import React from 'react';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const defaultColor = 'rgb(37, 152, 236)';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  createAccount: {
    justifyContent: 'right',
    margin: theme.spacing(4, 4, 6),
    display: 'inline-flex'
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: "center"
  },
  paper: {
    height: '100%',
    width: '60%',
    // margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainContent: {
      margin: theme.spacing(6, 4, 6),
      padding: theme.spacing(0, 6)
  },
  // avatar: {
  //   margin: theme.spacing(1),
  //   backgroundColor: theme.palette.secondary.main,
  // },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {

      margin: theme.spacing(3, 0, 2),
      padding: theme.spacing(1, 5, 1),
      fontSize: 14,
      backgroundColor: defaultColor
  },
  switch: {
      backgroundColor: 'white',
      fontSize: 12,
      padding: theme.spacing(1, 2, 1),
      color: defaultColor
  },
  label: {
      fontSize: 14,
      "&$focusedLabel": {
          color: defaultColor
      }
  },
  focusedLabel: {},
  underline: {
    "&:after": {
      borderBottom: '2px solid ' + defaultColor
    }
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container xs={false} sm={4} md={5} className={classes.image} />
      <Grid container xs={12} sm={8} md={7} component={Paper} elevation={6} className={classes.alignCenter} square>
        <div className={classes.paper}>
          {/*<Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>*/}
          <Grid container className={classes.createAccount}>
            Don't have an account?
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.switch}
            >
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
                          focused: classes.focusedLabel
                      }
                  }}
                  InputProps={{
                      classes: {
                          root: classes.underline
                      }
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
                          focused: classes.focusedLabel
                      }
                  }}
                  InputProps={{
                      classes: {
                          root: classes.underline
                      }
                  }}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
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
    </Grid>
  );
}
