import { Button, Paper, TextField } from "@mui/material";
import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useInput } from '../hooks/useInput';
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";


const Register = () => {
    
  const email = useInput('', {isEmpty: true, isEmail: true});
  const password = useInput('', {isEmpty: true, minLength: 6});

  const registerNewUser = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((response) =>
        console.log(response))
  }

  return (
    <div className='register__page'>
      <Paper className="register__form" elevation={6}>
        <div className='register__inputs'>

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
        <div className="register__buttons">
          <Button disabled={!email.inputValid || !password.inputValid} variant='contained' color='success' onClick={registerNewUser}>
            Sign Up
          </Button>
          <hr/>
          <p className="register__text">Already have an account? <NavLink to={LOGIN_ROUTE} className='navlink'>Sign In</NavLink></p>
        </div>
      </Paper>
    </div>
    // <Container>
    //   <Grid
    //     container
    //     style={{ height: window.innerHeight - 50 }}
    //     alignItems="center"
    //     justifyContent="center"
    //   >
    //     <Grid
    //       container
    //       direction="column"
    //       alignItems="center"
    //       style={{ width: 400, background: "lightgray" }}
    //     >
    //       <Box
    //         component="form"
    //         noValidate
    //         autoComplete="off"
    //         style={{ width: "100%", display: "grid", gap: "10px", padding: "10px" }}
    //       >

    //         <TextField
    //           fullWidth
    //           required
    //           id="email"
    //           label="Email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <TextField
    //           fullWidth
    //           required
    //           id="password"
    //           label="Password"
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </Box>
    //       <Box p={5}>
    //         <Button variant="contained" onClick={registerNewUser}>Register</Button>
    //       </Box>
    //     </Grid>
    //   </Grid>
    // </Container>
  );
};

export default Register;