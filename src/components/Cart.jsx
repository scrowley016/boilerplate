import React, { useState, useEffect } from 'react';
import { fetchAllCarts } from '../api/index';

const Cart = () => {
    const [carts, setCarts] = useState([]);
    console.log(carts)
    useEffect(() => {
      const cartPage = async () => {
        const carts = await fetchAllCarts();
        setCarts(carts);
      };
      cartPage();
    }, []);
  
    return (
      <div className='app-container'>
        
        <p>Cart:</p>
        <div>{carts.map((e, i) => {
            return (<div key={i}>
               {e.id ? <div> 

               <p>CartId: {e.id}</p>
               <p>userId: {e.usersId}</p>
              
              {/* // need selectedCars info to put in here */}
                
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