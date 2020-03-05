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
import { useStyles } from './loginStyles';
import Client from '../../utils/HTTPClient';
import SnackbarMessage from '../../components/snackbar-message/snackbar-message.component';

export default function Register({ resetCode }) {
  const [values, setValues] = useState({ password: '', confirmPassword: '' });
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const queueRef = useRef([]);

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmitReset = async event => {
    event.preventDefault();

    const resp = await Client.request(`/auth/reset/${resetCode}`, 'POST', values);
    if (resp.status !== 200) {
      queueRef.current.push({
        status: 'error',
        message: resp.error,
        key: new Date().getTime(),
      });
    } else {
      history.push('/login', {
        snackbar: {
          status: 'success',
          message: 'Password successfully changed!',
          key: new Date().getTime(),
        },
      });
    }

    if (open) {
      setOpen(false);
    } else {
      processQueue();
    }
  };

  useEffect(() => {
    const checkInvitationExistence = async resetCode => {
      const response = await Client.request(`/auth/reset/${resetCode}`, 'GET');
      if (response.status !== 200) {
        history.push('/login', {
          snackbar: {
            status: 'error',
            message: response.error,
            key: new Date().getTime(),
          },
        });
      }
    };

    checkInvitationExistence(resetCode);
  }, []);

  // const onSubmitRegister = async event => {
  //   event.preventDefault();
  //
  //   const response = await Client.request('/auth/register', 'POST', values);
  //   if (response.status === 201) {
  //     history.push('/login', {
  //       snackbar: {
  //         status: 'success',
  //         message: 'Successfully Created an Account!',
  //         key: new Date().getTime(),
  //       },
  //     });
  //   } else {
  //     // TODO: handle error (500 vs 400)
  //     queueRef.current.push({
  //       status: 'error',
  //       message: response.error,
  //       key: new Date().getTime(),
  //     });
  //   }

  //   if (open) {
  //     setOpen(false);
  //   } else {
  //     processQueue();
  //   }
  // };

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
            <Link to="/login">
              <Button type="submit" variant="contained" color="primary" className={classes.switch}>
                Back to Login
              </Button>
            </Link>
          </Grid>
          <Grid container className={classes.mainContent}>
            <Grid container>
              <Typography component="h1" variant="h5">
                Reset Your Password
              </Typography>
            </Grid>
            <form method="POST" className={classes.form} onSubmit={event => onSubmitReset(event)}>
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
              <Grid container className={classes.alignCenter}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Submit
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
