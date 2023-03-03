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

export async function fetchAllTypes() {
  try {
    const res = await fetch(`${APIURL}/type`);
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
