import React, { useState, useEffect } from 'react';
import { createNewCarPosting, deleteCarPosting } from '../api/index';
import { fetchAllCars, fetchAllTypes, fetchAllModels, fetchAllMakes } from '../api/index';

const Admin = () => {
    // For fetching all cars from DB
    const [cars, setCars] = useState([]);
    const [types, setTypes] = useState([]);
    const [models, setModels] = useState([]);
    const [makes, setMakes] = useState([]);

    // For drop down menu
    const [selectedMakeId, setSelectedMakeId] = useState('');

    // For creating car posts
    const [addMake, setAddMake] = useState('');
    const [addModel, setAddModel] = useState('');
    const [addType, setAddType] = useState('');
    const [addYear, setAddYear] = useState('');
    const [addPrice, setAddPrice] = useState('');
    const [addMileage, setAddMileage] = useState('');
    const [addDescription, setAddDescription] = useState('');
    const [addColor, setAddColor] = useState('');
    const [addUsersId, setAddUsersId] = useState(1);

    // funtction to refresh the useState

    const refreshCars = async () => {
        const cars = await fetchAllCars();
        const types = await fetchAllTypes();
        const models = await fetchAllModels();
        const makes = await fetchAllMakes();
        setCars(cars);
        setTypes(types)
        setModels(models);
        setMakes(makes)
    };

    // Handle functions for creating new car posting

    const handleCreateNewCarPosting = async (event) => {
        event.preventDefault();
        await createNewCarPosting(addMake, addModel, addType, addYear, addPrice, addMileage, addDescription, addColor, addUsersId)
        setAddMake('');
        setAddModel('');
        setAddType('');
        setAddYear('');
        setAddPrice('');
        setAddMileage('');
        setAddDescription('');
        setAddColor('');
    }

    const handleAddMake = event => {
        setAddMake(event.target.value)
    }

    const handleAddModel = event => {
        setAddModel(event.target.value)
    }

    const handleAddType = event => {
        setAddType(event.target.value)
    }

    const handleAddYear = event => {
        setAddYear(event.target.value)
    }

    const handleAddPrice = event => {
        setAddPrice(event.target.value)
    }

    const handleAddMileage = event => {
        setAddMileage(event.target.value)
    }

    const handleAddDescription = event => {
        setAddDescription(event.target.value)
    }

    const handleAddColor = event => {
        setAddColor(event.target.value)
    }

    // Handle function for deleting car posting

    const handleDeleteCarPosting = async (id) => {
        await deleteCarPosting(id)
    }

    useEffect(() => {
        refreshCars();
    }, []);

    return (
        <div className='app-container'>

            <p>Admin:</p>

            <h1>Add a new car:</h1>

            <form id='createCarPosts' onSubmit={handleCreateNewCarPosting}>
                <p>Make:<select className='select' onChange={handleAddMake}>
                    <option value=''>Make</option>
                    {makes.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
                </select>
                </p>
                <p>Model:<select className='select' onChange={handleAddModel}>
                    <option value=''>Model</option>
                    {models.filter((model) => model.makeId == addMake).map((e, j) => (<option key={j} value={e.id}>{e.name}</option>))}
                </select>
                </p>
                <p>Type:<select className='select' onChange={handleAddType}>
                    <option value=''>Type</option>
                    {types.map((e, j) => (<option key={j} value={e.id}>{e.name}</option>))}
                </select>
                </p>
                <p>Year: <input type='text' onChange={handleAddYear}></input></p>
                <p>Price: <input type='text' onChange={handleAddPrice}></input></p>
                <p>Mileage: <input type='text' onChange={handleAddMileage}></input></p>
                <p>Description: <input type='text' onChange={handleAddDescription}></input></p>
                <p>Color: <input type='text' onChange={handleAddColor}></input></p>
                <p>UserId: </p>
                <button className='button'>Create Posting</button>
            </form>
            <h1>Posted Cars:</h1>
            <div>{

                cars.map((e, i) => {

                    return (<div key={i} className="carPosts">

                        <p>Make: {makes.filter((make) => make.id === e.makeId)
                            .map((make) => (
                                <>{make.name}</>
                            ))} --- MakeId: {e.makeId}</p>
                        <p> Model: {models.filter((model) => model.id === e.modelId)
                            .map((model) => (
                                <>{model.name}</>
                            ))} --- Model Id: {e.modelId}</p>
                        <p>Type: {types.filter((type) => type.id === e.typeId).map((type) => (
                            <>{type.name}</>
                        ))}</p>
                        <p>Year: {e.year}</p>
                        <p>Price: ${e.price}</p>
                        <p>Milage: {e.mileage} mi</p>
                        <p>Description: {e.description}</p>
                        <p>Color: {e.color}</p>
                        <p>UserId: {e.usersId}</p>
                        <button className='button' onClick={() => handleDeleteCarPosting(e.id)}>Delete</button>

                    </div>)
                })}
            </div>
        </div>
    );
};

export default Admin;