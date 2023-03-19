import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchRegister } from "../api";
import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const register = await fetchRegister(username, password);
          if (register.error) {
            setMessage(register.message);
            setUsername('');
            setPassword('');   
            return;
            }
          if (register) {
            setMessage(register.message);
            setUsername('');
            setPassword('');   
            }
          history.push('/Login');
        } catch (error) {
            console.error("error in handleSubmit of Register.js");
        }
    };

    return (
        <div>
    <main
      aria-label="Main"
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
    >
      <div>
        <div>
          <h1
            className="font-serif md:text-4xl"
          >
            Create an Account with RideStack!
          </h1>

          <p className="mt-4 leading-relaxed text-gray-500">
            Do you see yourself in a new vehicle soon? Are you ready for the jurney? Start here!
          </p>
        </div>
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
        <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Create Username:
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
              Create an account
            </button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              <>Already have an account? </>
              <Link to="/Login"><a className="text-gray-700 underline">Log in</a>.</Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  </div>
  )
}

export default Register;