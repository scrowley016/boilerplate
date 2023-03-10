import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom';
import { Cars, Home, Login, Register, Cart, Navbar, Admin } from './index';

import '../style/App.css';
import NotFound from './NotFound';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState("");

  const history = useHistory();

  
  console.log(token);

  const loggedInUser = async () => {
    const { username } = await fetchMe(token);
    setUsername(username);
  }

  useEffect(() => {
    loggedInUser
  }, [token]);

  return (
    <BrowserRouter>
      <Navbar token={token} setToken={setToken} setUsername={setUsername}></Navbar>
      <div className='app-container'>
      </div>
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/Cars">
        <Cars />
      </Route>
      <Route path="/Cart">
        <Cart />
      </Route>
      <Route path="/Login">
        <Login setToken={setToken} />
      </Route>
      <Route path="/Register">
        <Register setToken={setToken} />
      </Route>
      <Route path="/Admin">
        <Admin />
      </Route>
      <Route exact path="*">
        <NotFound />
      </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
