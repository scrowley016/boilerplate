import React, { useState, useEffect } from 'react';
import { fetchAllCars, fetchAllTypes, fetchAllModels, fetchAllMakes } from '../api/index';
// import { getMakeByName } from '../db/make';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [types, setTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [makes, setMakes] = useState([]);

  const [selectedmake, setSelectedmake] = useState('');

    const handleMake = (event) => {
        setSelectedmake(event.target.value)
    }

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
  }, [selectedmake]);

  // console.log("cars:", cars)
  console.log("models:", models)
  // console.log("makes:", makes)
console.log("selectedMake:", selectedmake);

  return (
    <div className='app-container'>
      <h1>Home Page</h1>
      <div id='searchBar'>
        <select name='Make' value={selectedmake} onChange={handleMake}>
          <option value=''>Make</option>
          {makes.map((e, i) => (<option value={e.id}>{e.name}</option>))}
        </select>
        <select>
        <option value=''>Model</option>
          {models.filter((model) => model.makeId == selectedmake).map((e, i) => (<option>{e.name}</option>))}
        </select>
        <select>
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
      </div>

    </div>
  );
};

export default Home;