import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom';
import { Cars, Home, Login, Register, Cart } from './index';

import '../style/App.css';

const App = () => {


  useEffect(() => {
    
  }, []);

  return (
    <BrowserRouter>
      <Link to={'/Cars'} className='navLink'>Cars</Link>
      <Link to={'/Home'} className='navLink'>Home</Link>
      <Link to={'/Cart'} className='navLink'>Cart</Link>
      <div className='app-container'>
      <Route path="/Home">
        <Home />
      </Route>
      <Route path="/Cars">
        <Cars />
      </Route>
      <Route path="/Cart">
        <Cart />
      </Route>
      </div>
    </BrowserRouter>
  );
};

export default App;
