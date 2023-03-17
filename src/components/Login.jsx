import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createCart, fetchLogin, fetchAllCarts } from '../api/index';

const Login = ({setToken, setUser, setCart}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory();

    const login = async (event) => {
        event.preventDefault();
        setUsername('');
        setPassword('');

        try {
            if (!username || !password) {
              setMessage('Please supply both username and password');
            }
            const login = await fetchLogin(username, password);
            if (login.error) {
              setMessage('Invalid username or password, please try again');
            } else {
              setToken(login.token);
              setUser(login.user);
              createCart(login.user.id)
              const allCarts = await fetchAllCarts();
              const cart = allCarts[allCarts.length - 1]
              setCart(cart)
              localStorage.setItem('cart', JSON.stringify(cart));
              localStorage.setItem('token', JSON.stringify(login));
              history.push('/account');
            }
          } catch (error) {
            console.error(error);
          }
  }

    return (
<section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <aside
      className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
    >
      <img
        alt="electric car concept"
        src="https://images.pexels.com/photos/14675274/pexels-photo-14675274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </aside>

    <main
      aria-label="Main"
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <h1
          className="font-serif md:text-4xl"
        >
          Welcome back to RideStack!
        </h1>
        {message && (
              <div className='shadow-lg alert alert-error'>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='flex-shrink-0 w-6 h-6 stroke-current'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <span>{message}</span>
                </div>
              </div>
            )}
        <form action="#" className="mt-8 grid grid-cols-6 gap-6" onSubmit={login}>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="Username"
              className="block text-sm font-medium text-gray-700"
            >
              Username:
            </label>

            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>

            <input
              type="password"
              id="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Login
            </button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              <>Need an account? </>
              <a href="/register" className="text-gray-700 underline">Create New Account</a>.
            </p>
          </div>
        </form>
      </div>
    </main>
  </div>
</section>
)
}

export default Login