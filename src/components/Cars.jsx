import React, { useState, useEffect } from 'react';
import { fetchAllCars, fetchAllTypes, fetchAllModels, fetchAllPhotos } from '../api/index';
import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom';

const Cars = ({ carsearch }) => {
  const [cars, setCars] = useState([]);
  const [types, setTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [makes, setMakes] = useState([]);
  const [photos, setPhotos] = useState([]);

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
      const photos = await fetchAllPhotos();
      setCars(cars);
      setTypes(types)
      setModels(models);
      setPhotos(photos);
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


        <div>MakeId: {history.location.state?.makeId ? history.location.state?.makeId : "none applied"}</div>
        <div>ModelId: {history.location.state?.modelId ? history.location.state?.modelId : "none applied"}</div>
        <div>Price: {history.location.state?.price ? history.location.state?.price : "none applied"}</div>
      </div>



<section>
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <header>
      <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">
        Featured Cars
      </h2>
    </header>

    <div class="mt-8 block lg:hidden">
      <button
        class="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
      >
        <span class="text-sm font-medium"> Filters & Sorting </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>

    <div class="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
      <div class="hidden space-y-4 lg:block">


        <div>
          <p class="block text-xs font-medium text-gray-700">Sort by</p>

          <form>
                  <div id='carPostFilterDiv'>
                  <select className='select' >
                    <option value=''>Make</option>
                    {/* {makes.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))} */}
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
                  <button class="mt-8 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">Search</button>
                  </div>

                </form>
          
        </div>
      </div>

      
        
          



<div id='carPostsDiv'>            

            {

cars.map((e, i) => {

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
    </div></div>})}


    </div> 



         


            
          

        
      
    </div>
  </div>
</section>


      <div>{

        cars.map((e, i) => {

          

          if (state == undefined) {

          //   return ( <div key={i}>
          //     <p>MakeId: {e.makeId}</p>
          //     <p>ModelId: {e.modelId}</p>
          //     <p>Type: {types.filter((type) => type.id === e.typeId).map((type) => (
          //       <>{type.name}</>
          //     ))}</p>
          //     <p>Year: {e.year}</p>
          //     <p>Price: {e.price}</p>
          //     <p>Milage: {e.milage}</p>
          //     <p>Description: {e.description}</p>
          //     <p>Color: {e.color}</p>
          //     <p>UserId: {e.price}</p>
          //     ---------------------
          //     <ul>
          //       {models.filter((model) => model.makeId === e.makeId)
          //         .map((model, modelIndex) => (
          //           <li key={modelIndex}>
          //             <p> Model: {model.name}</p>
          //           </li>
          //         ))}
          //     </ul>
          //   </div>)
          // }


          return(
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
                    </div></div>)}

          else if ( e.makeId == state?.makeId || e.modelId == state?.modelId || e.price < state?.price) {

            // return (<div key={i}>
            //   <p>MakeId: {e.makeId}</p>
            //   <p>ModelId: {e.modelId}</p>
            //   <p>Type: {types.filter((type) => type.id === e.typeId).map((type) => (
            //     <>{type.name}</>
            //   ))}</p>
            //   <p>Year: {e.year}</p>
            //   <p>Price: {e.price}</p>
            //   <p>Milage: {e.milage}</p>
            //   <p>Description: {e.description}</p>
            //   <p>Color: {e.color}</p>
            //   <p>UserId: {e.price}</p>
            //   ---------------------
            //   <ul>
            //     {models.filter((model) => model.makeId === e.makeId)
            //       .map((model, modelIndex) => (
            //         <li key={modelIndex}>
            //           <p> Model: {model.name}</p>
            //         </li>
            //       ))}
            //   </ul>

            // </div>)

            return(


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
                        </div></div>)}
    

           



        })}</div>
    </div>
  );
};

export default Cars;