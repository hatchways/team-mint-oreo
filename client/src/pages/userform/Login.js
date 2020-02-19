import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './loginStyles';
import Client from '../../utils/HTTPClient';

export default function Login() {
  const [values, setValues] = useState({ email: '', password: '' });
  const history = useHistory();

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  // use login form as default form
  const classes = useStyles();

  const onSubmitLogin = async event => {
    event.preventDefault();

    const response = await Client.request('/user/login', 'POST', values);

    if (response.status !== 200) {
      alert('Login unsuccessful');
      // TODO: Show error message
    } else {
      console.log('login successful');
      history.push('/dashboard');
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {/*<Grid container xs={false} sm={4} md={5} className={classes.image}>*/}
      <Grid item xs={false} sm={4} md={5} className={classes.image}>
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
            <Link to="/register">
              <Button type="submit" variant="contained" color="primary" className={classes.switch}>
                Create Account
              </Button>
            </Link>
          </Grid>
          <Grid container className={classes.mainContent}>
            <Grid container>
              <Typography component="h1" variant="h5">
                Welcome Back!
              </Typography>
            </Grid>
            <form method="POST" className={classes.form} onSubmit={event => onSubmitLogin(event)}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleChange}
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
                value={values.password}
                onChange={handleChange}
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
                label={<Typography className={classes.rememberMe}>Remember Me</Typography>}
              />
              <Grid container className={classes.alignCenter}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Log in
                </Button>
              </Grid>
              <Grid container>
                <Grid item xs>
                  <Link to="#" variant="body2">
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
