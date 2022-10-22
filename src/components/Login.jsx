import { Button, Paper, TextField } from "@mui/material";
import React from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { NavLink } from "react-router-dom";
import { REGISTER_ROUTE } from "../utils/consts";
import { useInput } from '../hooks/useInput';


const Login = () => {

  const email = useInput('', {isEmpty: true, isEmail: true});
  const password = useInput('', {isEmpty: true, minLength: 6});

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {user} = await signInWithPopup(auth, provider);
    console.log(user);
  }

  const login = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((response) => {
        console.log(response);
      })
  }

  return (
      <div className='login__page'>
        <Paper className="login__form" elevation={6}>
          <div className='login__inputs'>

            <TextField
              fullWidth
              required
              id="email"
              label="Email"
              value={email.value}
              onChange={(e) => email.onChange(e)} onBlur={(e) => email.onBlur(e)}
              error={(email.isDirty && email.isEmpty) || (email.isDirty && email.emailError)}
              helperText={email.isDirty && email.errorText}
            />

            <TextField
              fullWidth
              required
              id="password"
              label="Password"
              type='password'
              value={password.value}
              onChange={(e) => password.onChange(e)} onBlur={(e) => password.onBlur(e)}
              error={
                (password.isDirty && password.isEmpty)
                || (password.isDirty && password.minLengthError)
                || (password.isDirty && password.maxLengthError)
              }
              helperText={password.isDirty && password.errorText}
            />

          </div>
          <div className="login__buttons">
            <Button disabled={!email.inputValid || !password.inputValid} variant='contained' color='success' onClick={login}>
              Sign In
            </Button>
            <hr/>
            <Button onClick={loginGoogle} variant="outlined">
              Login with Google
            </Button>
            <hr/>
            <p className="login__text">Need an account? <NavLink to={REGISTER_ROUTE} className='navlink'>Sign up now!</NavLink></p>
          </div>
        </Paper>
      </div>
  );
};

export default Login;