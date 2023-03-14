import { CommandCompleteMessage } from 'pg-protocol/dist/messages';
import React, { useState, useEffect } from 'react';
import { fetchAllCars, fetchAllTypes, fetchAllModels, fetchAllMakes } from '../api/index';
import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom';
import { Cars } from './index';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [types, setTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [makes, setMakes] = useState([]);
  const history = useHistory();

  const [selectedMakeId, setSelectedMakeId] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const [isLexiUp, setIsLexiUp] = useState(true);

  const loadCars = async () => {
    const cars = await fetchAllCars();
    const types = await fetchAllTypes();
    const makes = await fetchAllMakes();
    const models = await fetchAllModels();
    setCars(cars);
    setTypes(types)
    setMakes(makes);
    setModels(models);
  }

  const handleSubmit = (event) => {
    history.push("/cars", { makeId: selectedMakeId, modelId: selectedModelId, price: selectedPrice })
  }

  const handleCloseLexi = (event) => {
    event.preventDefault();
    setIsLexiUp(false)
  }

  useEffect(() => {
    loadCars();
  }, [isLexiUp]);

  return (

    <div className='app-container'>

      <section>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
            <div className="relative z-10 lg:py-16">
              <div className="relative h-64 sm:h-80 lg:h-full">
                <img
                  alt="House"
                  src="https://images.pexels.com/photos/9800006/pexels-photo-9800006.jpeg?auto=compress&cs=tinysrgb&w=800"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="relative flex items-center bg-gray-100">
              <span
                className="hidden lg:absolute lg:inset-y-0 lg:-left-16 lg:block lg:w-16 lg:bg-gray-100"
              ></span>

              <div className="p-8 sm:p-16 lg:p-24">
                <h2 className="text-2xl font-bold sm:text-3xl">
                  RideStack
                </h2>

                <div className="mt-4 text-gray-600" id='infoline'>
                  Your electric journey begins here.
                </div>

                <form>
                  <div id='searchDiv'>
                  <select className='select' value={selectedMakeId} onChange={(event) => setSelectedMakeId(event.target.value)}>
                    <option value=''>Make</option>
                    {makes.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
                  </select>
                  <select className='select' value={selectedModelId} onChange={(event) => setSelectedModelId(event.target.value)}>
                    <option value=''>Model</option>
                    {models.filter((model) => model.makeId == selectedMakeId).map((e, j) => (<option key={j} value={e.id}>{e.name}</option>))}
                  </select>
                  <select className='select' value={selectedPrice} onChange={(event) => setSelectedPrice(event.target.value)}>
                    <option value='0'>Max Price</option>
                    <option>40000</option>
                    <option>60000</option>
                    <option>80000</option>
                    <option>100000</option>
                    <option>120000</option>
                    <option>140000</option>
                    <option>160000</option>
                    <option>180000</option>
                    <option>200000</option>
                    <option>300000</option>
                    <option>400000</option>
                    <option>500000</option>
                  </select>
                  <button className="mt-8 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" onClick={handleSubmit}>Search</button>
                  </div>

                </form>


              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
  <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
        Electric Car Buying Made Easy
      </h2>

      <p className="mt-4 text-gray-500 sm:text-xl">
        Order online and we will ship your car to you anywhere in the world with free same-day delivery. Take 30 days to love it or return it. The way it should be done. A hassle-free kind of happy.
        
      </p>
    </div>

    <div className="mt-8 sm:mt-12">
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div
          className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
        >
          <dt className="order-last text-lg font-medium text-gray-500">
            APR
          </dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
            0%
          </dd>
        </div>

        <div
          className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
        >
          <dt className="order-last text-lg font-medium text-gray-500">
            Free Delivery
          </dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">$0</dd>
        </div>

        <div
          className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
        >
          <dt className="order-last text-lg font-medium text-gray-500">
            Miles Per Gallon
          </dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">∞</dd>
        </div>
      </dl>
    </div>
  </div>
</section>

<section className="bg-white">
  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
    <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
      Read trusted reviews from our customers
    </h2>

    <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
      <blockquote className="rounded-lg bg-gray-100 p-8">
        <div className="flex items-center gap-4">
          <img
            alt="ana-pic"
            src="https://scontent-dfw5-2.xx.fbcdn.net/v/t1.6435-9/122410913_10218791330950052_8514943875771135716_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=_M-K-GzZyzoAX9gnoMx&_nc_ht=scontent-dfw5-2.xx&oh=00_AfCkpHT3VJrzXRHGpji4rYgoDPjCFwWysnBZT_cNkNjugQ&oe=64334A9E"
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <div className="flex justify-center gap-0.5 text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>

            <p className="mt-1 text-lg font-medium text-gray-700">Ana T.</p>
          </div>
        </div>

        <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-500">
     I love my new car! I reccomend all my friends to RideStack!
        </p>
      </blockquote>

      <blockquote className="rounded-lg bg-gray-100 p-8">
        <div className="flex items-center gap-4">
          <img
            alt="Man"
            src="data:image/png;base64,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"
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <div className="flex justify-center gap-0.5 text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>

            <p className="mt-1 text-lg font-medium text-gray-700">Zack M.</p>
          </div>
        </div>

        <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-500">
          I was in the market for a new car and RideStack made it easier than ever. With just a few clicks I was driving my brand new Mercedes later that day with their free same-day shipping!
        </p>
      </blockquote>

      <blockquote className="rounded-lg bg-gray-100 p-8">
        <div className="flex items-center gap-4">
          <img
            alt="Man"
            src="https://avatars.githubusercontent.com/u/111461443?v=4"
            className="h-16 w-16 rounded-full object-cover"
          />

          <div>
            <div className="flex justify-center gap-0.5 text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>

            <p className="mt-1 text-lg font-medium text-gray-700">Bobby W.</p>
          </div>
        </div>

        <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-500">
      11/10, would reccomend.
        </p>
      </blockquote>
    </div>
  </div>
</section>


{isLexiUp ? 
<aside
  className="fixed bottom-4 right-4 z-50 flex items-center justify-center gap-4 rounded-lg bg-black px-5 py-3 text-white"
>
  <a
    href="/cars"
    target="_blank"
    rel="noreferrer"
    className="text-sm font-medium hover:opacity-75"
  >
   🙋‍♀️ Hi there, let me help you find your new ride!
   <p><em>Lexi (Your RideStack Virtual Assistant)</em></p>
  </a>

  <button onClick={handleCloseLexi} className="rounded bg-white/20 p-1 hover:bg-white/10">
    <span className="sr-only">Close</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </button>
</aside>
: ""}

    </div>



  );
};

export default Home;