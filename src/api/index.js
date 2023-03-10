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


// // Add a car to a cart
export async function addToSelectedCars(carsId, cartId) {
  try {
    const res = await fetch(`/api/selectedCar/${carsId}`,
    { method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          carsId: carsId,
          cartId: cartId
        })});
    const json = res.json();
    return json;
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

export async function createNewCarPosting(
  addMake,
  addModel,
  addType,
  addYear,
  addPrice,
  addMileage,
  addDescription,
  addColor,
  addUsersId
) {
  try {
    console.log('make:', addMake);
    console.log('model:', addModel);
    console.log('year:', addYear);
    const res = await fetch(`${APIURL}/cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        makeId: addMake,
        modelId: addModel,
        typeId: addType,
        year: addYear,
        price: addPrice,
        mileage: addMileage,
        description: addDescription,
        color: addColor,
        usersId: addUsersId,
      }),
    });
    const json = res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
}

// Delete car posts
export async function deleteCarPosting(id) {
  try {
    const res = await fetch(`${APIURL}/cars/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = res.json();
    json.error ? window.alert(json.error) : '';
    return json;
  } catch (err) {
    console.error(err);
  }
}

//  Edit car posts
export async function editCarPosting(
  id,
  editMake,
  editModel,
  editType,
  editYear,
  editPrice,
  editMileage,
  editDescription,
  editColor,
  editUsersId
) {
  try {
    console.log(id);
    console.log(editPrice);
    const res = await fetch(`${APIURL}/cars/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        makeId: editMake,
        modelId: editModel,
        typeId: editType,
        year: editYear,
        price: editPrice,
        mileage: editMileage,
        description: editDescription,
        color: editColor,
        usersId: editUsersId,
      }),
    });
    console.log('test1');
    const json = res.json();
    console.log(json);
    return json;
  } catch (err) {
    console.error(err);
  }
}

// Get photos
export async function fetchAllPhotos() {
  try {
    const res = await fetch(`${APIURL}/photos`);
    const json = res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
}

// Add photos
export async function createPhoto(carsId, image) {
  try {
    const res = await fetch(`${APIURL}/photos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        carsId: carsId,
        image: image,
      }),
    });
    const json = res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
}

// Delete photos
export async function deletePhoto(id) {
  try {
    console.log('photo is #2:', id);
    const res = await fetch(`${APIURL}/photos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
}
