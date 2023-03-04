import React, { useState, useEffect } from 'react';
import { fetchAllCars, fetchAllTypes, fetchAllModels, fetchAllMakes } from '../api/index';
// import { getMakeByName } from '../db/make';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [types, setTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [makes, setMakes] = useState([]);

  const [selectedmake, setSelectedmake] = useState('');
  const [selectedmodel, setSelectedmodel] = useState('');
  const [selectedprice, setSelectedprice] = useState('');

  const [carsearch, setCarsearch] = useState([])

  const handleModel = (event) => {
    setSelectedmodel(event.target.value)
  }

  const handlePrice = (event) => {
    setSelectedprice(event.target.value)
  }

  console.log("make:", selectedmake)
  console.log("model:", selectedmodel)

  useEffect(() => {
    const homePage = async () => {
      const cars = await fetchAllCars();
      const types = await fetchAllTypes();
      const makes = await fetchAllMakes();
      const models = await fetchAllModels();
      setCars(cars);
      setTypes(types)
      setMakes(makes);
      setModels(models);
    };
    homePage();
  }, []);

// console.log("price:", selectedprice)

  return (

    <div className='app-container'>


      <h1>Home Page</h1>
      <form id='searchBar'>
        <select value={selectedmake} onChange={(event) => {setSelectedmake(event.target.value)}}>
          <option value=''>Make</option>
          {makes.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
        </select>
        <select value={selectedmodel} onChange={handleModel}>
          <option value=''>Model</option>
          {models.filter((model) => model.makeId == selectedmake).map((e, j) => (<option key={j} value={e.id}>{e.name}</option>))}
        </select>
        <select value={selectedprice} onChange={handlePrice}>
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
        <button id='searchButton'>Search</button>
      </form>

    </div>
  );
};

export default Home;