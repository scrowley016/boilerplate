import React, { useState, useEffect } from 'react';
import { fetchAllCarts, fetchSelectedCars } from '../api/index';

const Cart = () => {
    const [carts, setCarts] = useState([]);
    const [selectedCars, setSelectedCars] = useState([]);
    console.log(carts);
    console.log(selectedCars);

    useEffect(() => {
      const cartPage = async () => {
        const carts = await fetchAllCarts();
        setCarts(carts);
      };
      cartPage();
    }, []);
  
    const getSelectedCars = async (cartId) => {
      const cars = await fetchSelectedCars(cartId);
      setSelectedCars([...selectedCars, ...cars]);
    };

    return (
      <div className='app-container'>
        
        <p>Cart:</p>
        <div>{carts.map((e, i) => {
            return (<div key={i}>
               {e.id ? 
               <div> 
               <p>CartId: {e.id}</p>
               <p>userId: {e.usersId}</p>
              {/* // need selectedCars info to put in here */}
                <p>Selected Cars:</p>
                  <ul>
                      {selectedCars.map((car, j) => (
                        <li key={j}>
                          <p>CarId: {car.id}</p>
                          {/*We can add more car details here */}
                        </li>
                      ))}
                  </ul>
                    <button onClick={() => getSelectedCars(e.id)}>Get selected cars</button>
               </div>
               : "" 
              }
           
            </div>
            )
        })}</div>
      </div>
    );
  };
  
  export default Cart;