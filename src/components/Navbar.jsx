import React, { useEffect }  from 'react';
import { Link, Router, useHistory } from 'react-router-dom';

const Navbar = ({ token, setToken, setUsername }) => {
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('token');
        setUsername('');
        setToken('');
        history.push('/');   
  }

    return (
    <div>
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center justify-between gap-8">
            <div className='flex items-center sm:px-6 lg:px-8'>
              <div className='flex justify-start mr-10'>
                <Link to='/'>
                  <span className='font-serif text-4xl'>RideStack</span>
                </Link>
              </div>
              <div className='flex justify-end flex-1 mr-auto'>
                <Link to="/" className=' active:text-pink-500'>
                    <button className='m-2 font-serif text-xl hover:text-pink-500 focus:text-pink-500'>
                        Home
                    </button>
                </Link>
                <Link to="/cars" className=' active:text-pink-500'>
                    <button className='m-2 font-serif text-xl hover:text-pink-500 focus:text-pink-500'>
                        Cars
                    </button>
                </Link>
                <Link to="/cart" className=' active:text-pink-500'>
                    <button className='m-2 font-serif text-xl hover:text-pink-500 focus:text-pink-500'>
                        Cart
                    </button>
                </Link>  
                <Link to="/admin" className=' active:text-pink-500'>
                    <button className='m-2 font-serif text-xl hover:text-pink-500 focus:text-pink-500'>
                        Admin
                    </button>
                </Link>  
              </div>
            </div>
      <div className="flex items-center">
        <div className="flex items-center divide-x divide-gray-100 border-x border-gray-100">
          <span>
          <div className="dropdown dropdown-end">
      <label tabIndex="0" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </label>
      <div tabIndex="0" className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
                          <button className="btn btn-primary btn-block">
                            <Link to="/cart">View cart</Link>
                            
                          </button>
          </div>
        </div>
      </div>
    </div>
          </span>
<Link to="/search">
          <span className="hidden sm:block">
          <button className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
    </button>
                </span>
                </Link>
                {!token ? (
                    <>
                      <Link to="/Login" className=' active:text-pink-500'>
                      <button className='m-2 font-serif text-xl hover:text-pink-500 focus:text-pink-500'>
                          Login
                      </button>
                      </Link>
                    </>
                ) : (
                    <>
                      <Link to='/account'>
                      <span className="hidden sm:block">
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
                      <Link to='/' className=' active:text-pink-500'>
                        <button
                          className='m-2 font-serif text-xl hover:text-pink-500 focus:text-pink-500'
                          onClick={logout}
                        >
                          logout
                        </button>
                      </Link>
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