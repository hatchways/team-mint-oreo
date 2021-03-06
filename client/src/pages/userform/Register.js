import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useStyles } from './loginStyles';
import Client from '../../utils/HTTPClient';
import SnackbarMessage from '../../components/snackbar-message/snackbar-message.component';

export default function Register({ invCode }) {
  const [values, setValues] = useState({
    email: '',
    displayName: '',
    password: '',
    confirmPassword: '',
    language: 'en',
  });
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const queueRef = useRef([]);

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmitRegister = async event => {
    event.preventDefault();

    const response = await Client.request('/auth/register', 'POST', values);
    if (response.status === 201) {
      history.push('/login', {
        snackbar: {
          status: 'success',
          message: 'Successfully Created an Account!',
          key: new Date().getTime(),
        },
      });
    } else {
      // TODO: handle error (500 vs 400)
      queueRef.current.push({
        status: 'error',
        message: response.error,
        key: new Date().getTime(),
      });
    }

    if (open) {
      setOpen(false);
    } else {
      processQueue();
    }
  };

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setMessageInfo(queueRef.current.shift());
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    processQueue();
  };

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
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
            <Grid className={classes.accountText}>Already have an account?</Grid>
            <Link to="/login">
              <Button type="submit" variant="contained" color="primary" className={classes.switch}>
                Login
              </Button>
            </Link>
          </Grid>
          <Grid container className={classes.mainContent}>
            <Grid container>
              <Typography component="h1" variant="h5">
                Create an account
              </Typography>
            </Grid>
            <form
              method="POST"
              className={classes.form}
              onSubmit={event => onSubmitRegister(event)}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
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
                id="displayName"
                label="Display Name"
                name="displayName"
                value={values.displayName}
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.confirmPassword}
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
              <FormControl required margin="normal" className={classes.formControl}>
                <InputLabel className={classes.label}>Select primary language</InputLabel>
                <NativeSelect value={values.language} onChange={handleChange} name="language">
                  <option value="en">English</option>
                  <option value="zh">Chinese (Simplified)</option>
                  <option value="zh-TW">Chinese (Traditional)</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="ko">Korean</option>
                  <option value="hi">Hindi</option>
                  <option value="de">German</option>
                  <option value="ja">Japanese</option>
                  <option value="pt">Portuguese</option>
                </NativeSelect>
              </FormControl>
              <Grid container className={classes.alignCenter}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Create Account
                </Button>
              </Grid>
            </form>
          </Grid>
        </div>
      </Grid>
      <SnackbarMessage
        messageInfo={messageInfo}
        open={open}
        handleExited={handleExited}
        handleClose={handleClose}
      />
    </Grid>
  );
}
