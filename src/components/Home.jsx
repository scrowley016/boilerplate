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
  const history = useHistory();

  const [selectedMakeId, setSelectedMakeId] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

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

  const handleSubmit = (event) => {
    history.push("/cars", {makeId: selectedMakeId, modelId: selectedModelId, price: selectedPrice})
  }

  useEffect(() => {
    loadCars();
  }, []);

  return (

    <div className='app-container'>

      <h1>Begin your adventure here...</h1>
      <form id='searchBar'>
        <select className='select' value={selectedMakeId} onChange={(event) => setSelectedMakeId(event.target.value)}>
          <option value=''>Make</option>
          {makes.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
        </select>
        <select className='select' value={selectedModelId} onChange={(event) => setSelectedModelId(event.target.value)}>
          <option value=''>Model</option>
          {models.filter((model) => model.makeId == selectedMakeId).map((e, j) => (<option key={j} value={e.id}>{e.name}</option>))}
        </select>
        <select className='select' value={selectedPrice} onChange={(event) => setSelectedPrice(event.target.value)}>
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
        <button className='button' onClick={handleSubmit}>Search</button>
      </form>
    </div>

  );
};

export default Home;