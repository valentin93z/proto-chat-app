import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebaseConfig';

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;