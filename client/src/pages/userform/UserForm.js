import React, { useState, useEffect } from 'react';
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
  // use login form as default form
  const [formSwitch, setFormSwitch] = useState("Login");
  console.log(formSwitch);
  const classes = useStyles();

  const backToRegister = (event) => {
      event.preventDefault();
      setFormSwitch("Register");
  }

  const backToLogin = (event) => {
      event.preventDefault();
      setFormSwitch("Login");
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
      {formSwitch==="Login" ? (
          <Login backToRegister={backToRegister} />
      ): <Register backToLogin={backToLogin} />}
      </Grid>
    </Grid>
  );
}
