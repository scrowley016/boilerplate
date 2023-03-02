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
        <p>Available Cars:</p>
        <div>{cars.map((e, i) => {
            return (<div key={i}>
               
                <p>MakeId: {e.makeId}</p>
                <p>TypeId: {e.typeId}</p>
                <p>Year: {e.year}</p>
                <p>Price: {e.price}</p>
                <p>Milage: {e.milage}</p>
                <p>Description: {e.description}</p>
                <p>Color: {e.color}</p>
                <p>UserId: {e.userId}</p>
                ---------------------
            </div>
            )
        })}</div>
      </div>
    );
  };
  
  export default Cars;