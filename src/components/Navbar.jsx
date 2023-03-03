import React, { useEffect }  from 'react';
import { Link, Router, useHistory } from 'react-router-dom';

const Navbar = ({ token, setToken, username, setUsername }) => {
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('token');
        setUsername('');
        setToken('');
        history.push('/');   
    }
    
    useEffect

    return (
        <div className='flex items-center justify-between h-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8'>
            <div className='flex items-center'>
        <Link to='/'>
          <span className='font-serif text-4xl'>RideStack</span>
        </Link>
            </div>
            <div className='flex justify-center flex-1 mr-auto'>
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
                                    <Link to='/myroutines'>
              <span className='m-2 mx-1 font-serif text-xl hover:text-pink-500 focus:text-pink-500'>
                👤 {username}
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
    )
}

export default Navbar;