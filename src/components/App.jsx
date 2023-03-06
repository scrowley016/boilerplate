import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom';
import { Cars, Home, Login, Register, Cart, Navbar } from './index';

import '../style/App.css';
import NotFound from './NotFound';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState("")

  const history = useHistory();

  
  console.log(token);

  const loggedInUser = async () => {
    const { username } = await fetchMe(token);
    setUsername(username);
  }

  // const logout = () => {
  //   localStorage.removeItem('token');
  //   setUsername('');
  //   setToken('');
  //   history.push('/');   
  // }

  useEffect(() => {
    loggedInUser
  }, []);

  return (
    <BrowserRouter>
      <Navbar token={token} setToken={setToken} username={username} setUsername={setUsername}></Navbar>
      {/* <Link to={'/Cars'} className='navLink'>Cars</Link>
      <Link to={'/Home'} className='navLink'>Home</Link> */}
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
      <Route path="/Login"> <Login setToken={setToken} /></Route>
      <Route exact path="*"> <NotFound /> </Route>
      </Switch>
    </BrowserRouter>

    // <div>
    //   <header>
    //     <Navbar ></Navbar>
    //   </header>
    //   <main>hello world</main>
    // </div>
  );
};

export default App;
