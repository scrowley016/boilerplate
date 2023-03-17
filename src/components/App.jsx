import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom';
import { Cars, Home, Login, Register, Cart, Navbar, Admin, Footer, Account } from './index';
import { fetchAllCarts } from '../api/index';

import '../style/App.css';

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
 
  const [username, setUsername] = useState("");
  
  // console.log('token in App.jsx', { token });
  // console.log('user in App.jsx', {user});

  const history = useHistory();

  console.log("cart on App:", cart)
  useEffect(() => {

  }, [token, user, cart]);

  return (
    <BrowserRouter>
      <header><Navbar token={token} setToken={setToken} setUsername={setUsername} user={user} setUser={setUser} cart={cart}></Navbar></header>
      <div className='app-container'>
      </div>
      <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/Cars">
        <Cars userId={user?.id} cart={cart}/>
      </Route>
      <Route path="/Cart">
        <Cart userId={user?.id} cart={cart}/>
      </Route>
      <Route path="/Login">
          <Login setToken={setToken} setUser={setUser} setCart={setCart}/>
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
      {/* <Route path="/:carsId">
        <Car_details selectedCar={selectedCar}/>
      </Route> */}
      {/* <Route exact path="*">
        <NotFound />
      </Route> */}
      </Switch>
      <footer><Footer /></footer>
    </BrowserRouter>
  );
};

export default App;
