import React from "react";
import { AppBar, Button, Grid, Toolbar } from "@mui/material";
import { LOGIN_ROUTE } from "../utils/consts";
import { NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';


const Navbar = () => {

  const [user] = useAuthState(auth);

  return (
    <AppBar color="primary" position="static">
      <Toolbar variant="dense">
        <Grid container columnSpacing={2} justifyContent="flex-end">
          {user ? (
            <Button onClick={() => signOut(auth)} variant="outlined" style={{color: '#fff', borderColor: '#fff'}}>
              Log Out
            </Button>
          ) : (
            <NavLink to={LOGIN_ROUTE} className='navlink'>
              <Button variant="outlined" style={{color: '#fff', borderColor: '#fff'}}>
                Log In
              </Button>
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;