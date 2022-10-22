import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { privateRoutes, publicRoutes } from "../routes";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebaseConfig";

const AppRouter = () => {
  const [user] = useAuthState(auth);

  console.log(user);

  return user ? (
    <Routes>
      {privateRoutes.map(({ path, Component }) => (
        <Route path={path} element={<Component />} exact={true} key={Component} />
      ))}
      <Route path="*" element={<Navigate to={CHAT_ROUTE} replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route path={path} element={<Component />} exact={true} key={Component} />
      ))}
      <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
    </Routes>
  );
};

export default AppRouter;