import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom';
import { Cars, Home, Login, Register, Cart, Navbar, Admin, Footer, Account } from './index';
import { fetchAllCarts } from '../api/index';
=======
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Cars, Home, Login, Register, Cart, Navbar, Admin, Footer, Account, Car_details, NotFound } from './index';
>>>>>>> 93bfefaa66fae52bba1cd26f2a46f3248f2470fa

import '../style/App.css';

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState([]);
 
  const [username, setUsername] = useState("");
<<<<<<< HEAD
  
  // console.log('token in App.jsx', { token });
  // console.log('user in App.jsx', {user});

  const history = useHistory();

=======
  const [selectedCar, setSelectedCar] = useState()
>>>>>>> 93bfefaa66fae52bba1cd26f2a46f3248f2470fa

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
        <Cars userId={user?.id} />
      </Route>
      <Route path="/Cart">
        <Cart userId={user?.id} />
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
