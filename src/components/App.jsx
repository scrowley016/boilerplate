import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Cars, Home, Login, Register, Cart, Navbar, Admin, Footer, Account, Car_details, NotFound } from './index';

import '../style/App.css';

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState("");
  const [selectedCar, setSelectedCar] = useState()

  useEffect(() => {

  }, [token, user]);

  return (
    <BrowserRouter>
      <header><Navbar token={token} setToken={setToken} setUsername={setUsername} user={user} setUser={setUser}></Navbar></header>
      <div className='app-container'>
      </div>
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/Cars">
        <Cars userId={user?.id}/>
      </Route>
      <Route path="/Cart">
        <Cart userId={user?.id}/>
      </Route>
      <Route path="/Login">
          <Login setToken={setToken} setUser={setUser} />
      </Route>
      <Route path="/Register">
        <Register />
      </Route>
      <Route path="/Admin">
        <Admin userId={user?.id}/>
      </Route>
      <Route path="/account">
        <Account user={user} />
      </Route>
      <Route path="/:carsId">
        <Car_details selectedCar={selectedCar}/>
      </Route>
      <Route exact path="*">
        <NotFound />
      </Route>
      </Switch>
      <footer><Footer /></footer>
    </BrowserRouter>
  );
};

export default App;
