import React, { useState, useEffect } from 'react';
import { fetchAllCarts, fetchSelectedCars, fetchAllCars, fetchAllMakes, fetchAllModels, fetchAllPhotos, fetchAllTypes, deleteCarFromSelectedCar } from '../api/index';

const Cart = ({ userId, cart }) => {
  const [selectedCars, setSelectedCars] = useState([]);
  const [allCarts, setAllCarts] = useState([]);

  const [cars, setCars] = useState([]);
  const [types, setTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [makes, setMakes] = useState([]);
  const [photos, setPhotos] = useState([]);

  const [isRemove, setIsRemove] = useState(false)

  useEffect(() => {
    const cartPage = async () => {
      const allCarts = await fetchAllCarts();
      const carsInCart = await fetchSelectedCars();
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
      // setCarts(carts);
      setAllCarts(allCarts)
      setSelectedCars(carsInCart);
    };
    cartPage();
  }, [isRemove]);

  console.log("cart from cartpage:", cart)

  console.log("selectedcars from cart page:", selectedCars)



  const usersCarsinCart = selectedCars.filter((car) => car.cartId == cart.id)
  console.log({ usersCarsinCart })

  const carsInCart = usersCarsinCart.map((car) => cars.find((c) => c.id == car.carsId))

  const priceOfCars = carsInCart.map((car) => car.price)

  const totalInCartNoCommas = priceOfCars.reduce((partialSum, a) => partialSum + a, 0)

  const totalInCart = totalInCartNoCommas.toLocaleString("en-US")

  console.log({ carsInCart })
  console.log({ priceOfCars })

  const handleDeleteSelectedCars = async (id) => {
    setIsRemove(true)
    console.log("car id from handle remove:", id)
    await deleteCarFromSelectedCar(id);
    setIsRemove(false)
  };


  const checkoutAlert = () => {
    alert("Thank you for your order! :)")
    
  }

  return (
    <div className='app-container'>

      <div>{userId ? allCarts.filter((c) => c.id == cart.id).map((e, i) => {

        return (<div key={i}>
          {e.id ?
            <div>

              <section>
                <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                  <div class="mx-auto max-w-3xl">
                    <header class="text-center">
                      <h2 class="text-xl font-bold text-gray-900 sm:text-3xl font-serif md:text-4xl">Your Cart</h2>
                    </header>

                    <div class="items-center">
                      <ul class="flex justify-center bg-gray-200 rounded-md">



                        <li class="flex-wrap justify-center">


                          {carsInCart.map((e, i) => {
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

                                  <div id="removeFromCartDiv">
                                    <button className='button' id="deleteFromCartButton" onClick={() => handleDeleteSelectedCars(e.id)}>Remove</button>
                                  </div>
                                </div>

                              </div>)
                          })}


                        </li>

                      </ul>


                    </div>

                  </div>



                  <div class="mt-8 flex justify-center border-t border-gray-100 pt-8">
                    <div class="w-screen max-w-lg space-y-4">
                      <dl class="space-y-0.5 text-sm text-gray-700">


                        <div class="flex justify-between !text-base font-medium">
                          <dt>Total</dt>
                          <dd>${totalInCart}</dd>
                        </div>
                      </dl>

                      <div class="flex justify-center">

                      </div>

                      <div class="flex justify-center">
                        <a
                          onClick={checkoutAlert}
                          class="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                        >
                          Checkout
                        </a>
                      </div>
                    </div>
                  </div>





                </div>
              </section>
            </div>
            : ""
          }

        </div>
        )
      })



        : <h2>Please log in to see your cart!</h2>}</div>

      <div>


      </div>
    </div>
  );
};

export default Cart;