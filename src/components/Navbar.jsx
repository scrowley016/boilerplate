import React, { useEffect, useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { deleteCart, fetchSelectedCars } from '../api/index';

const Navbar = ({ token, setToken, setUsername, user, setUser, cart }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedCars, setSelectedCars] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const cartCount = async () => {
      const carsInCart = await fetchSelectedCars();
      setSelectedCars(carsInCart);
    };
    cartCount();
  }, []);

    const logout = () => {
      deleteCart(cart.id)
      localStorage.removeItem('token');
      localStorage.removeItem('cart');
      setUsername('');
      setToken('');
      setUser('');
      history.push('/');   
  }

  const carsInCart = selectedCars.filter((f) => f.cartId == cart.id) 

  const carsInCartNumber = carsInCart.length

  console.log({carsInCartNumber})

    return (
    <div>
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center justify-between gap-8">
            <div id="navBar" className='flex items-center sm:px-6 lg:px-8'>
              <div className='flex justify-start mr-10'>
                <Link to='/'>
                  <span className='font-serif text-4xl pl-2'>RideStack</span>
                </Link>
              </div>
              <div className='flex justify-end flex-1 mr-auto d-md-none hidden'>
                <Link to="/cars" className=' active:text-indigo-600'>
                    <button className='m-2 font-serif text-xl font-style: italic hover:text-indigo-600 focus:text-indigo-600 '>
                        Find Your Car...
                    </button>
                </Link>

              </div>
            </div>
      <div className="flex items-center">
              <div className="flex items-center divide-x divide-gray-100 border-x border-gray-100 pr-2">
                
                {!token ? (
                    <div className="sm:flex sm:gap-4">
                    <Link to="/Login"
                      className="block rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                    >
                      Log-in
                    </Link>

                    <Link to="/register"
                      className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-indigo-600 transition hover:text-indigo-600/75 sm:block"
                    >
                      Sign-up
                    </Link>
                    
                  </div>
                ) : (
                    <>
                      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            {user?.username &&
                <Link to="/cart">
                <span>
          <div>
      <label tabIndex="0" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        </div>
      </label>
                  </div>
          </span>
                  </Link> 
                }
                      <Link to='/account'>
                      <span className="flex items-center divide-x divide-gray-100 border-x border-gray-100">
                        <button className="btn btn-ghost btn-circle">
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                        </button>
                      </span>
                      </Link>
                      <Link to='/'>
                        <button
                          onClick={logout}
        className="btn btn-ghost btn-circle group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 opacity-75"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>

        <span
          className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
        >
          Logout
        </span>
      </button>
                      </Link>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-1 lg:flex">
        {user?.username &&
                <Link to="/cart">
                <span>
          <div>
      <label tabIndex="0" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        </div>
        {/* <span>({carsInCartNumber})</span> */}
      </label>
                  </div>
          </span>
                  </Link> 
                }
                      <Link to='/account'>
                      <span className="flex items-center divide-x divide-gray-100 border-x border-gray-100">
                        <button className="btn btn-ghost btn-circle">
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                        </button>
                      </span>
                      </Link>
                      <Link to='/'>
                        <button
                          onClick={logout}
        className="btn btn-ghost btn-circle group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 opacity-75"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>

        <span
          className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
        >
          Logout
        </span>
      </button>
                      </Link>
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
                    </>
                  )
                }  
        </div>
      </div>
    </div>
  </div>

        </div>
    )
}

export default Navbar;