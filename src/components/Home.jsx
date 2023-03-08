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
    history.push("/cars", { makeId: selectedMakeId, modelId: selectedModelId, price: selectedPrice })
  }

  useEffect(() => {
    loadCars();
  }, []);

  return (

    <div className='app-container'>

      {/* <h1>Begin your adventure here...</h1> */}
      {/* <form id='searchBar'>
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
      </form> */}

      <section>
        <div class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
            <div class="relative z-10 lg:py-16">
              <div class="relative h-64 sm:h-80 lg:h-full">
                <img
                  alt="House"
                  src="https://images.pexels.com/photos/9800006/pexels-photo-9800006.jpeg?auto=compress&cs=tinysrgb&w=800"
                  class="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            <div class="relative flex items-center bg-gray-100">
              <span
                class="hidden lg:absolute lg:inset-y-0 lg:-left-16 lg:block lg:w-16 lg:bg-gray-100"
              ></span>

              <div class="p-8 sm:p-16 lg:p-24">
                <h2 class="text-2xl font-bold sm:text-3xl">
                  RideStack
                </h2>

                <div class="mt-4 text-gray-600" id='infoline'>
                  Your electric journey begins here
                </div>

                <form>
                  <div id='searchDiv'>
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
                  <button class="mt-8 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" onClick={handleSubmit}>Search</button>
                  </div>

                </form>


              </div>
            </div>
          </div>
        </div>
      </section>







    </div>



  );
};

export default Home;