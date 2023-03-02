import React, { useState, useEffect } from 'react';
import { fetchAllCars } from '../api/index';

const Cars = () => {
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
        <h1>Cars Page!</h1>
        <p>API Status: {JSON.stringify(cars)}</p>
      </div>
    );
  };
  
  export default Cars;