import axios from 'axios';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export const APIURL = `http://localhost:4000/api`;

//this is where all our api endpoints are located

// Fetch all selectedCars
export async function fetchSelectedCars(cartId) {
  try {
    const response = await fetch(`/api/selectedCars/carts/${cartId}`);
    const selectedCars = await response.json();
    return selectedCars;
  } catch (err) {
    console.error(err);
  }
}

// Add a car to a cart
export async function addToCart(carId, cartId) {
  try {
    const response = await axios.post(`${APIURL}/carts/${cartId}/cars/${carId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

// Fetch all cars
export async function fetchAllCars() {
  try {
    const res = await fetch(`${APIURL}/cars`);
    const json = res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
}

// Fetch all carts
export async function fetchAllCarts() {
  try {
    const res = await fetch(`${APIURL}/cart`);
    const json = res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
}

// fetch all types
export async function fetchAllTypes() {
  try {
    const res = await fetch(`${APIURL}/type`);
    const json = res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
}

// fetch all makes
export async function fetchAllMakes() {
  try {
    const res = await fetch(`${APIURL}/make`);
    const json = res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
}

// models
export async function fetchAllModels() {
  try {
    const res = await fetch(`${APIURL}/models`);
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
}
//users endpoints
export const fetchRegister = async (username, password) => {
  const res = await fetch(`${APIURL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: `${username}`,
      password: `${password}`,
    }),
  });
  const json = await res.json();
  return json;
};

//POST /api/users/login
export const fetchLogin = async (username, password) => {
  const res = await fetch(`${APIURL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: `${username}`,
      password: `${password}`,
    }),
  });
  const json = await res.json();
  return json;
};

//GET /api/users/me
export const fetchMe = async (token) => {
  const res = await fetch(`${APIURL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  return json;
};


