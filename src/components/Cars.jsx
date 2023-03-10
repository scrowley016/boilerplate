import React, { useState, useEffect } from 'react';

import { fetchAllCars, fetchAllTypes, fetchAllModels, fetchAllPhotos, fetchAllMakes } from '../api/index';
import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom';

const Cars = ({ carsearch }) => {
  const [cars, setCars] = useState([]);
  const [types, setTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [makes, setMakes] = useState([]);
  const [photos, setPhotos] = useState([]);

  // Adding filters
  const [filterMake, setFilterMake] = useState('');
  const [filterModel, setFilterModel] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  // Obtain history
  const history = useHistory();
  const state = history.location?.state
  // Functions to set filter info from home page (history)

  const handleSetMakeFromHistory = () => {
    const makeFromHistory =  state.makeId
    setFilterMake(makeFromHistory)
    console.log({filterMake})
  }
  
  const handleSetModelFromHistory = () => {
    const modelFromHistory =  state.modelId
    setFilterModel(modelFromHistory)
    console.log({filterModel})
  }

  const handleSetPriceFromHistory = () => {
    const priceFromHistory =  state.price
    setFilterPrice(priceFromHistory)
    console.log({filterPrice})
  }


  console.log("history:", history);


  // console.log("state.makeId:", state?.makeId);



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
      const makes = await fetchAllMakes();
      const models = await fetchAllModels();
      const photos = await fetchAllPhotos();
      setCars(cars);
      setTypes(types)
      setModels(models);
      setMakes(makes);
      setPhotos(photos);

      handleSetMakeFromHistory();
      handleSetModelFromHistory();
      handleSetPriceFromHistory();
    };
    carPage();
  }, []);

  return (
    <div className='app-container'>

      <section>
        <div class="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="bg-blue-600 p-8 md:p-12 lg:px-16 lg:py-24">
              <div class="mx-auto max-w-xl text-center">


                <h2 class="text-2xl font-bold text-white md:text-3xl">
                  Your chariot awaits
                </h2>

                <p class="hidden text-white/90 sm:mt-4 sm:block">
                  Customize your search:
                </p>

                <form>
                  <div id='carPostFilterDiv'>
                    <select className='select' >
                      <option value=''>Make</option>
                      {makes.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
                    </select>
                    <select className='select'>
                      <option value=''>Model</option>
                      {/* {models.filter((model) => model.makeId == selectedMakeId).map((e, j) => (<option key={j} value={e.id}>{e.name}</option>))} */}
                    </select>
                    <select className='select'>
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

                  </div>

                </form>

              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
              <img
                alt="Student"
                src="https://images.pexels.com/photos/4913911/pexels-photo-4913911.jpeg?auto=compress&cs=tinysrgb&w=800"
                class="h-40 w-full object-cover sm:h-56 md:h-full"
              />

              <img
                alt="Student"
                src="https://images.pexels.com/photos/8827011/pexels-photo-8827011.jpeg?auto=compress&cs=tinysrgb&w=800"
                class="h-40 w-full object-cover sm:h-56 md:h-full"
              />

            </div>
          </div>
        </div>
      </section>


      {/* <div>
        <h2>Filters:</h2>
        <div>MakeId: {history.location.state?.makeId ? history.location.state?.makeId : "none applied"}</div>
        <div>ModelId: {history.location.state?.modelId ? history.location.state?.modelId : "none applied"}</div>
        <div>Price: {history.location.state?.price ? history.location.state?.price : "none applied"}</div>
      </div> */}

      <div id="postsDisplay">

        {cars.map((e, i) => {
          return (
            <div key={i} className="carPost">
         
              <div>
              {photos.filter((photo) => photo.carsId === e.id).map((p, i) => (<img
                className='carPhoto'
                key={i}
                src={p.image}
              ></img>))}

              <h4>{e.year} {makes.filter((make) => make.id === e.makeId)
                  .map((make) => (
                    <>{make.name}</>
                  ))}</h4>
              <div id='makeandmodeldiv'>
                  <h4>
                  {models.filter((model) => model.id === e.modelId)
                    .map((model) => (
                      <div> {model.name}</div>
                    ))}</h4>
              </div>

              <div className='priceandmilesdiv'><h5>${e.price}</h5><h5>{e.mileage} miles</h5></div>
              <div className='cardescription'>
                "{e.description}"
                <div className='typeandcolordiv'>
                  <>{types.filter((type) => type.id === e.typeId).map((type) => (
                    <div>{type.name}</div>
                  ))}</>
                  <div>{e.color}</div>
                </div>
              
              </div>
        
              {/* <div id="addToCartButton"><button className='button'>Add to Cart</button></div> */}
              </div>
        
            </div>)
        })}

      </div>




      {/* {cars.map((e, i) => {

        if (state == undefined) {

          return (
            <div key={i} className="carPosts">

              <div className='makeandmodeldiv'>
                <h3>{e.year}</h3> <h3>{makes.filter((make) => make.id === e.makeId)
                  .map((make) => (
                    <>{make.name} </>
                  ))}
                  {models.filter((model) => model.id === e.modelId)
                    .map((model) => (
                      <> {model.name}</>
                    ))}</h3>
              </div>
              <div className='carPhoto'>{photos.filter((photo) => photo.carsId === e.id).map((p, i) => (<img className='carPhoto' key={i} src={p.image}></img>))}</div>
              <div className='priceandmilesdiv'><h4>${e.price}</h4><h4>{e.mileage} miles</h4></div>
              <div className='cardescription'>
                "{e.description}"
                <div className='typeandcolordiv'>
                  <>{types.filter((type) => type.id === e.typeId).map((type) => (
                    <div>{type.name}</div>
                  ))}</>
                  <div>{e.color}</div>
                </div>
              </div></div>)
        }

        else if (e.makeId == state?.makeId || e.modelId == state?.modelId || e.price < state?.price) {

          return (

            <div key={i} className="carPosts">

              <div className='makeandmodeldiv'>
                <h3>{e.year}</h3> <h3>{makes.filter((make) => make.id === e.makeId)
                  .map((make) => (
                    <>{make.name} </>
                  ))}
                  {models.filter((model) => model.id === e.modelId)
                    .map((model) => (
                      <> {model.name}</>
                    ))}</h3>
              </div>
              <div className='carPhoto'>{photos.filter((photo) => photo.carsId === e.id).map((p, i) => (<img className='carPhoto' key={i} src={p.image}></img>))}</div>
              <div className='priceandmilesdiv'><h4>${e.price}</h4><h4>{e.mileage} miles</h4></div>
              <div className='cardescription'>
                "{e.description}"
                <div className='typeandcolordiv'>
                  <>{types.filter((type) => type.id === e.typeId).map((type) => (
                    <div>{type.name}</div>
                  ))}</>
                  <div>{e.color}</div>
                </div>
              </div></div>)
        }
      })} */}


      </div>
    );
  };
  
  export default Cars;