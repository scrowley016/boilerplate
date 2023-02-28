import Axios from 'axios';
import React, { useState, useEffect } from 'react';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { fetchAllCars } from '../api/index';
import '../style/App.css';

const App = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const carPage = async () => {
      const cars = await fetchAllCars();
      setCars(cars);
    };
    carPage();
  }, []);

  return (
    <div className='app-container'>
      <h1>Hello, World!</h1>
      <p>API Status: {JSON.stringify(cars)}</p>
    </div>
  );
};

export default App;
