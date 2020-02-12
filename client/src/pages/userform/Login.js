import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useStyles } from './loginStyles';

export default function Login({ backToRegister }) {
    const classes = useStyles();

    return (
        <div className={classes.paper}>
          <Grid container className={classes.createAccount}>
            <Grid className={classes.accountText}>Don't have an account?</Grid>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.switch}
                onClick={event => backToRegister(event)}
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
    );
}
