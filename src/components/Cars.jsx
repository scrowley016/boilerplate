import React, { useState, useEffect } from 'react';

import { fetchAllCars, fetchAllTypes, fetchAllModels, fetchAllPhotos, fetchAllMakes, addToSelectedCars, fetchAllCarts } from '../api/index';
import { useHistory } from 'react-router-dom';

const Cars = ({userId, cart}) => {
  const [cars, setCars] = useState([]);
  const [types, setTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [makes, setMakes] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [carts, setCarts] = useState([]);

  const [selectedMakeId, setSelectedMakeId] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  // Adding filters
  const [filterMake, setFilterMake] = useState('');
  const [filterModel, setFilterModel] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  const [isFilterMakeOnHistory, setIsFilterMakeOnHistory] = useState(false)
  const [isFilterModelOnHistory, setIsFilterModelOnHistory] = useState(false)
  const [isFilterPriceOnHistory, setIsFilterPriceOnHistory] = useState(false)

  const [isFilterMakeOnCarsPage, setIsFilterMakeOnCarsPage] = useState(false)
  const [isFilterModelOnCarsPage, setIsFilterModelOnCarsPage] = useState(false)
  const [isFilterPriceOnCarsPage, setIsFilterPriceOnCarsPage] = useState(false)

  const [isFilterOnCarsPage, setIsFilterOnCarsPage] = useState(false)


  // Obtain history
  const history = useHistory();
  const state = history.location?.state

  // Functions to set filter info from home page (history)

  const handleSetMakeFromHistory = () => {
    const makeFromHistory = state?.makeId
    if (makeFromHistory) {
      setFilterMake(makeFromHistory)
      setIsFilterMakeOnHistory(true)
    }
  }

  const handleSetModelFromHistory = () => {
    const modelFromHistory = state?.modelId
    if (modelFromHistory) {
      setFilterModel(modelFromHistory)
      setIsFilterModelOnHistory(true)
    }
  }

  const handleSetPriceFromHistory = () => {
    const priceFromHistory = state?.price
    if (priceFromHistory) {
      setFilterPrice(priceFromHistory)
      setIsFilterPriceOnHistory(true)
    }
  }

  // Function to handle filter from cars page

  const handleSetMakeFromCarsPage = (event) => {
    setSelectedMakeId(event.target.value)
    setIsFilterMakeOnCarsPage(true)
  }

  const handleSetModelFromCarsPage = (event) => {
    setSelectedModelId(event.target.value)
    setIsFilterModelOnCarsPage(true)
  }

  const handleSetPriceFromCarsPage = (event) => {
    setSelectedPrice(event.target.value)
    setIsFilterPriceOnCarsPage(true)
  }
 
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsFilterOnCarsPage(true);
    setFilterMake(selectedMakeId)
    setFilterModel(selectedModelId)
    setFilterPrice(selectedPrice)
  }

  // console.log({userId})

  useEffect(() => {
    const carPage = async () => {
      const cars = await fetchAllCars();
      const types = await fetchAllTypes();
      const makes = await fetchAllMakes();
      const models = await fetchAllModels();
      const photos = await fetchAllPhotos();
      const carts = await fetchAllCarts();
      setCars(cars);
      setTypes(types)
      setModels(models);
      setMakes(makes);
      setPhotos(photos);
      setCarts(carts);

      if(isFilterOnCarsPage == false){
      handleSetMakeFromHistory();
      handleSetModelFromHistory();
      handleSetPriceFromHistory();
      }else if(isFilterOnCarsPage == true) {
        setIsFilterMakeOnHistory(false)
        setIsFilterModelOnHistory(false)
        setIsFilterPriceOnHistory(false)
      }
    };
    carPage();
  }, [filterMake, filterModel, filterPrice, selectedMakeId, selectedModelId, selectedPrice]);



  const handleAddToSelectedCars = async (carsId, cart) => {
    await addToSelectedCars(carsId, cart.id);
  };


  return (
    <div className='app-container'>

      <section>
        <div class="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="bg-blue-600 p-8 md:p-12 lg:px-16 lg:py-24">
              <div class="mx-auto max-w-xl text-center">


                <h2 class="text-2xl font-bold text-white md:text-3xl mb-5">
                  Your chariot awaits
                </h2>

                <p class="hidden text-white/90 sm:mt-4 sm:block">
                  Customize your search:
                </p>

                <form>
                  <div id='searchDiv'>
                  <select className='select' value={selectedMakeId} onChange={handleSetMakeFromCarsPage}>
                    <option value=''>Make</option>
                    {makes.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
                  </select>
                  <select className='select' value={selectedModelId} onChange={handleSetModelFromCarsPage}>
                    <option value=''>Model</option>
                    {models.filter((model) => model.makeId == selectedMakeId).map((e, j) => (<option key={j} value={e.id}>{e.name}</option>))}
                  </select>
                  <select className='select' value={selectedPrice} onChange={handleSetPriceFromCarsPage}>
                    <option value='0'>Max Price</option>
                    <option>40,000</option>
                    <option>60,000</option>
                    <option>80,000</option>
                    <option>100,000</option>
                    <option>120,000</option>
                    <option>140,000</option>
                    <option>160,000</option>
                    <option>180,000</option>
                    <option>200,000</option>
                    <option>300,000</option>
                    <option>400,000</option>
                    <option>500,000</option>
                  </select>
                  <button class="mt-8 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" onClick={handleSubmit}>Search</button>
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



      <div id="postsDisplay">

        {cars.filter((c) => {
      
          if (isFilterMakeOnHistory == true) {
            if (isFilterPriceOnHistory == true && isFilterModelOnHistory == false){
              return c.makeId == filterMake && c.price <= filterPrice
            }
            if (isFilterModelOnHistory == true) {
              if (isFilterPriceOnHistory == true){
                return c.modelId == filterModel && c.price <= filterPrice
              }
              return c.modelId == filterModel
            }
            return c.makeId == filterMake
          }
          if (isFilterPriceOnHistory == true) {
            return c.price <= filterPrice
          }

          if (!filterMake && !filterPrice){
            return c.id
          }

          if (isFilterMakeOnCarsPage == true) {
            if (isFilterPriceOnCarsPage == true && isFilterModelOnCarsPage == false){
              return c.makeId == filterMake && c.price <= filterPrice
            }
            if (isFilterModelOnCarsPage == true) {
              if (isFilterPriceOnCarsPage == true){
                return c.modelId == filterModel && c.price <= filterPrice
              }
              return c.modelId == filterModel
            }
            return c.makeId == filterMake
          }
          if (isFilterPriceOnCarsPage == true) {
            return c.price <= filterPrice
          }

          else return c.id

        }).map((e, i) => {
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

                <hr></hr>

                <div className='priceandmilesdiv'><h5>${e.price.toLocaleString("en-US")}</h5><h5>{e.mileage.toLocaleString("en-US")} miles</h5></div>
                <div className='cardescription'>
                  {e.description}
                  <div className='typeandcolordiv'>
                    <>{types.filter((type) => type.id === e.typeId).map((type) => (
                      <div>{type.name}</div>
                    ))}</>
                    <div>{e.color}</div>
                  </div>
          
                </div>
                { userId ? 
                <div id="addToCartDiv">
                <button className='button' id="addToCartButton"onClick={() => handleAddToSelectedCars(e.id, cart)}>Add to cart</button>
                </div> : ""}
                </div>

            </div>)
        })}

      </div>



    </div>
  );
};

export default Cars;