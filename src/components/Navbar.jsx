import React, { useEffect }  from 'react';
import { Link, Router, useHistory } from 'react-router-dom';

const Navbar = ({ token, setToken, setUsername, user, setUser }) => {
  const history = useHistory();


    const logout = () => {
        localStorage.removeItem('token');
        setUsername('');
      setToken('');
      setUser('');
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

                {user?.isAdmin == true ? 

                <Link to="/admin" className=' active:text-pink-500'>
                    <button className='m-2 font-serif text-xl hover:text-pink-500 focus:text-pink-500'>
                        Admin
                    </button>
                  </Link>
                  :
                  ""
                }
              </div>
            </div>
      <div className="flex items-center">
              <div className="flex items-center divide-x divide-gray-100 border-x border-gray-100">
                
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
                {!token ? (
                    <div class="hidden flex-1 items-center justify-end gap-4 sm:flex">
                    <Link to="/Login"
                      className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-500"
                    >
                      Log in
                    </Link>
            
                    <Link to="/register"
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white"
                    >
                      Sign up
                    </Link>
                  </div>
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