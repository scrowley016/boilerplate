import React, { useState, useEffect } from 'react';
import { fetchAllCars, fetchAllTypes, fetchAllModels } from '../api/index';
import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom';

const Cars = ({ carsearch }) => {
  const [cars, setCars] = useState([]);
  const [types, setTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [makes, setMakes] = useState([]);

  const history = useHistory();

  console.log("history:", history);


  const state = history.location?.state

  console.log("state.makeId:", state?.makeId);



  // if(history.location.state.modelId){
  //   const searchedModelId = history.location.state.makeId
  // }
  // if(history.location.state.makeId){
  //   const searchedPrice = history.location.state.makeId
  // }

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

      <div>
        <h2>Filters:</h2>
        {/* 

      <form id='searchBar'>
        <select className='select' value={selectedmakeId} onChange={(event) => setSelectedmakeId(event.target.value)}>
          <option value=''>Make</option>
          {makes.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
        </select>
        <select className='select' value={selectedmodelId} onChange={(event) => setSelectedmodelId(event.target.value)}>
          <option value=''>Model</option>
          {models.filter((model) => model.makeId == selectedmakeId).map((e, j) => (<option key={j} value={e.id}>{e.name}</option>))}
        </select>
        <select className='select' value={selectedprice} onChange={(event) => setSelectedprice(event.target.value)}>
          <option value='0'>Max Price</option>
          <option>$20,000</option>
          <option>$40,000</option>
          <option>$60,000</option>
          <option>$80,000</option>
          <option>$100,000</option>
          <option>$120,000</option>
          <option>$140,000</option>
          <option>$160,000</option>
          <option>$180,000</option>
          <option>$200,000</option>
        </select>
        <button className='button'>Search</button>
      </form> */}


        <p>MakeId - {history.location.state?.makeId}</p>
        <p>ModelId - {history.location.state?.modelId}</p>
        <p>Price - {history.location.state?.price}</p>
      </div>

      <div>{

        cars.map((e, i) => {

          if (state == undefined) {

            return ( <div key={i}>
              <p>MakeId: {e.makeId}</p>
              <p>ModelId: {e.modelId}</p>
              <p>Type: {types.filter((type) => type.id === e.typeId).map((type) => (
                <>{type.name}</>
              ))}</p>
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
            </div>)
          }

          else if ( e.makeId == state?.makeId || e.modelId == state?.modelId || e.price < state?.price) {

            return (<div key={i}>
              <p>MakeId: {e.makeId}</p>
              <p>ModelId: {e.modelId}</p>
              <p>Type: {types.filter((type) => type.id === e.typeId).map((type) => (
                <>{type.name}</>
              ))}</p>
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

            </div>)
          }



        })}</div>
    </div>
  );
};

export default Cars;