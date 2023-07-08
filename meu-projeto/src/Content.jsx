import React from "react";
import { Switch, Route } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';
import { Store } from './pages/Store';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFoundPage } from './pages/NotFoundPage';
import { OrderHistory } from "./pages/OrderHistory";

export const Content = () => {
    
  return (
    <UserContextProvider>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/store" component={Store} />
        <Route exact path="/register" component={Register} />
        <Route exact path='/Order' component={OrderHistory}/>
        <Route path="/cart" component={Cart} />
        <Route path="*" element={NotFoundPage} />
      </Switch>
    </UserContextProvider>
  );
}
