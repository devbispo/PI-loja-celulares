import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';



const PrivateRoute = ({ component: Component, ...rest }) => {
  // Verificar o estado de autenticação do usuário aqui
  const isAuthenticated = firebase.auth().currentUser !== null;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
