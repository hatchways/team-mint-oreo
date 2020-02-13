import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './loginStyles';
import Login from './Login';
import Register from './Register';

export default function UserForm() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const {login, handleSubmit} = useForm();

  const onSubmit = (data) => {
      console.log(data);
  }

  // use login form as default form
  const classes = useStyles();

  const onSubmitRegister = (event) => {
    event.preventDefault();
    console.log(event.target.value);
  };

  const onSubmitLogin = (event) => {
      event.preventDefault();
      console.log(event.target);
  }

  return (
    <Grid container component="main" className={classes.root}>
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
          <BrowserRouter>
              <Route path='/login' component={() => <Login
                                                      login={login}
                                                      onSubmit={onSubmit}
                                                      handleSubmit={handleSubmit} />} />
              <Route path='/register' component={() => <Register onSubmitRegister={onSubmitRegister} />} />
          </BrowserRouter>
      </Grid>
    </Grid>
  );
}
