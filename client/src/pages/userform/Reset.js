import React, { useState, useEffect, useRef } from 'react';
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
import SnackbarMessage from '../../components/snackbar-message/snackbar-message.component';
import Client from '../../utils/HTTPClient';

export default function Reset() {
  const [values, setValues] = useState({ email: '' });
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const queueRef = useRef([]);

  // useEffect(() => {
  //   if(snackbar.message) queueRef.current.push(snackbar);
  //   if(open) {
  //       setOpen(false);
  //   } else {
  //       processQueue();
  //   }
  //   console.log('open status: ', open);
  // }, [])

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  // use login form as default form
  const classes = useStyles();

  const onSubmitSend = async event => {
    event.preventDefault();
    const response = await Client.request('/auth/reset', 'POST', values);

    if(response.status !== 200) {
      queueRef.current.push({
        status: 'error',
        message: response.error,
        key: new Date().getTime(),
      });
    } else {
      queueRef.current.push({
        status: 'success',
        message: 'Email successfully sent!',
        key: new Date().getTime(),
      });
    }
    if(open) {
      setOpen(false);
    } else {
      processQueue();
    }
  }
  // const onSubmitLogin = async event => {
  //   event.preventDefault();
  //
  //   const response = await Client.request('/auth/login', 'POST', values);
  //
  //   if (response.status !== 200) {
  //     queueRef.current.push({
  //       status: 'error',
  //       message: 'Invalid credentials',
  //       key: new Date().getTime(),
  //     });
  //   } else {
  //     if (invCode) {
  //       const invitationQuery = {
  //         code: invCode,
  //         toUserId: response.userData._id,
  //       };
  //       const invResp = await Client.request('/invite', 'POST', invitationQuery);
  //     }
  //
  //     history.push('/dashboard', {
  //         id: response.userData.id,
  //         snackbar: {
  //           status: 'success',
  //           message: 'Successfully Logged In!',
  //           key: new Date().getTime()
  //         }
  //     });
  //   }
  //

  // };
  const processQueue = () => {
    if(queueRef.current.length > 0) {
      setMessageInfo(queueRef.current.shift());
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if(reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const handleExited = () => {
    processQueue();
  }

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
            <Link to="/login">
              <Button type="submit" variant="contained" color="primary" className={classes.switch}>
                Back to Login
              </Button>
            </Link>
          </Grid>
          <Grid container className={classes.mainContent}>
            <Grid container>
              <Typography component="h1" variant="h5">
                Reset your password
              </Typography>
            </Grid>
            <form method="POST" className={classes.form} onSubmit={event => onSubmitSend(event)}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address for Password Reset Link"
                name="email"
                autoComplete="email"
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
              <Grid container className={classes.alignCenter}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Send Email
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
