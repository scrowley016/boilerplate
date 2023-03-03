import React, { useState, useEffect } from 'react';
import { fetchAllCars, fetchAllTypes } from '../api/index';

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [types, setTypes] = useState([]);
    const [models, setModels] = useState([]);

    useEffect(() => {
      const carPage = async () => {
        const cars = await fetchAllCars();
        const types = await fetchAllTypes();
        const models = await fetchAllModels();
        setCars(cars);
        setTypes(types)
        setModels(models);
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
                <p>ModelId: {e.modelId}</p>
                <p>Type: {types.map((a, i) => {return (<div key={i}>{a.name}</div>)})}</p>
                <p>Year: {e.year}</p>
                <p>Price: {e.price}</p>
                <p>Milage: {e.milage}</p>
                <p>Description: {e.description}</p>
                <p>Color: {e.color}</p>
                <p>UserId: {e.price}</p>
                ---------------------
                <ul>
                  {models.filter((model) => model.makeId === e.makeId)
                  .map((model, modelIndex) => (
                    <li key={modelIndex}>
                      <p> Model: {model.name}</p>
                    </li>
                  ))}
                </ul>
            </div>
            )
        })}</div>
      </div>
    );
  };
  
  export default Cars;