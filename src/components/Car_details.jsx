import React, { useEffect, useState } from 'react';
import { fetchAllCars } from '../api';

const Car_details = ({selectedCar}) => {
    const [cars, setCars] = useState([]);

    const handleClick = () => {
        history.back();
      };

    useEffect(() => { }, []);
    
    const singleCar = async () => {
        try {
            const myCar = await fetchAllCars();
            setCars(myCar);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="group relative block overflow-hidden">
            <button
            className='btn btn-outline btn-primary m-5'
            onClick={handleClick}
            >
            Go Back
            </button>
      
        <img
          src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
          alt=""
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />
      
        <div className="relative border border-gray-100 bg-white p-6">
      
                {cars.filter((c) => c.id === selectedCar)
                    .map((c) => {
                        return (
                            <tr key={c.id}>
                                <td className="mt-1 text-sm text-gray-700">
                                    {c.description}
                                </td>
                                <td className="mt-1 text-sm text-gray-700">
                                    {c.price}
                                </td>
                                <td className="mt-1 text-sm text-gray-700">
                                    {c.year}
                                </td>
                                <td className="mt-1 text-sm text-gray-700">
                                    {c.color}
                                </td>
                                <td className="mt-1 text-sm text-gray-700">
                                    {c.mileage}
                                </td>
                        </tr>
                    )
                })}

          <h3 className="mt-4 text-lg font-medium text-gray-900">Robot Toy</h3>
      
            <p className="mt-1 text-sm text-gray-700">$14.99</p>
            <p className="mt-1 text-sm text-gray-700">$14.99</p>
            <p className="mt-1 text-sm text-gray-700">$14.99</p>
            <p className="mt-1 text-sm text-gray-700">$14.99</p>
            <p className="mt-1 text-sm text-gray-700">$14.99</p>
            <p className="mt-1 text-sm text-gray-700">$14.99</p>
            <p className="mt-1 text-sm text-gray-700">$14.99</p>
            <p className="mt-1 text-sm text-gray-700">$14.99</p>
            <p className="mt-1 text-sm text-gray-700">$14.99</p>

      
          <form className="mt-4">
            <button
                className="block w-full rounded btn btn-active btn-primary p-4 text-sm font-medium transition hover:scale-105"
            >
              Add to Cart
            </button>
          </form>
        </div>
      </div>      
)
}

export default Car_details;