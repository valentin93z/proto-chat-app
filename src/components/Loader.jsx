import React from 'react';
import { Container, Grid } from "@mui/material";

const Loader = () => {
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          container
          direction="column"
          alignItems='center'
        >
          <div className="lds-facebook"><div></div><div></div><div></div></div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Loader;