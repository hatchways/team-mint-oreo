import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
// import { useForm } from 'react-hook-form';
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
  const [values, setValues] = useState({email: '', password: ''});
  const [regValues, setRegValues] = useState({email: '', password: '', confirmPassword: '', language: ''});
  // const [formState, setFormState] = useState({});

  const handleChange = event => {
      const { name, value } = event.target;
      setValues({...values, [name]:value});
  }

  const handleChangeReg = event => {
      const { name, value } = event.target;
      setRegValues({...regValues, [name]: value});
  }

  // use login form as default form
  const classes = useStyles();

  const onSubmitRegister = async (event) => {
    // event.preventDefault();
    // console.log(regValues);
    event.preventDefault();
    console.log(JSON.stringify(regValues));
    const response = await fetch('http://localhost:3001/user/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(regValues)
    });

    console.log(response);
  };

  const onSubmitLogin = (event) => {
      event.preventDefault();
      console.log(JSON.stringify(values));
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
                                                      values={values}
                                                      handleChange={handleChange}
                                                      handleSubmit={onSubmitLogin} />} />
              <Route path='/register' component={() => <Register
                                                      values={regValues}
                                                      handleChange={handleChangeReg}
                                                      handleSubmit={onSubmitRegister} />} />
          </BrowserRouter>
      </Grid>
    </Grid>
  );
}
