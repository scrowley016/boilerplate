import { CommandCompleteMessage } from 'pg-protocol/dist/messages';
import React, { useState, useEffect } from 'react';
import { fetchAllCars, fetchAllTypes, fetchAllModels, fetchAllMakes } from '../api/index';
import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom';
import { Cars } from './index';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [types, setTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [makes, setMakes] = useState([]);

  const [selectedmakeId, setSelectedmakeId] = useState('');
  const [selectedmodelId, setSelectedmodelId] = useState('');
  const [selectedprice, setSelectedprice] = useState('');

  const [carsearch, setCarsearch] = useState([])

  const loadCars = async () => {
    const cars = await fetchAllCars();
    const types = await fetchAllTypes();
    const makes = await fetchAllMakes();
    const models = await fetchAllModels();
    setCars(cars);
    setTypes(types)
    setMakes(makes);
    setModels(models);
  }

  console.log(carsearch)

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <BrowserRouter>
      <div className='app-container'>

        <h1>Begin your adventure...</h1>
        <form id='searchBar'>
          <select className='select' value={selectedmakeId} onChange={(event) => { setSelectedmakeId(event.target.value) }}>
            <option value=''>Make</option>
            {makes.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
          </select>
          <select className='select' value={selectedmodelId} onChange={(event) => { setSelectedmodelId(event.target.value) }}>
            <option value=''>Model</option>
            {models.filter((model) => model.makeId == selectedmakeId).map((e, j) => (<option key={j} value={e.id}>{e.name}</option>))}
          </select>
          <select className='select' value={selectedprice} onChange={(event) => { setSelectedprice(event.target.value) }}>
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


          <Link to="/Cars">
            <div className='button' onClick={(event) => {
              setCarsearch([selectedmakeId, selectedmodelId, selectedprice]);
            }}>
              Search
            </div>
          </Link>

        </form>

        <Switch>
          <Route path="/Cars">
            <Cars carsearch={carsearch}/>
          </Route>
        </Switch>


      </div>
    </BrowserRouter>
  );
};

export default Home;