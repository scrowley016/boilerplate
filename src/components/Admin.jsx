import React, { useState, useEffect } from 'react';
import { createNewCarPosting, deleteCarPosting, editCarPosting, createPhoto, deletePhoto } from '../api/index';
import { fetchAllCars, fetchAllTypes, fetchAllModels, fetchAllMakes, fetchAllPhotos } from '../api/index';

const Admin = () => {
    // For fetching all cars from DB
    const [cars, setCars] = useState([]);
    const [types, setTypes] = useState([]);
    const [models, setModels] = useState([]);
    const [makes, setMakes] = useState([]);
    const [photos, setPhotos] = useState([]);

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
    const [addPhoto, setAddPhoto] = useState('');
    const [addUsersId, setAddUsersId] = useState(1);

    // For editing pop up form
    const [editable, setEditable] = useState(false)
    const [editableId, setEditableId] = useState('')

    // For editing car posts
    const [editMake, setEditMake] = useState('');
    const [editModel, setEditModel] = useState('');
    const [editType, setEditType] = useState('');
    const [editYear, setEditYear] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editMileage, setEditMileage] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editColor, setEditColor] = useState('');
    const [editUsersId, setEditUsersId] = useState(1);

    // States to trigger refresh
    const [isAdded, setIsAdded] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isPhotoAdd, setIsPhotoAdd] = useState(false);
    const [isPhotoDelete, setIsPhotoDelete] = useState(false);


    // funtction to refresh the useState

    const refreshCars = async () => {
        const cars = await fetchAllCars();
        const types = await fetchAllTypes();
        const models = await fetchAllModels();
        const makes = await fetchAllMakes();
        const photos = await fetchAllPhotos();
        setCars(cars);
        setTypes(types)
        setModels(models);
        setMakes(makes);
        setPhotos(photos);
    };

    // Handle functions for creating new car posting

    const handleCreateNewCarPosting = async (event) => {
        event.preventDefault();
        setIsAdded(true)
        await createNewCarPosting(addMake, addModel, addType, addYear, addPrice, addMileage, addDescription, addColor, addUsersId)
        setAddMake('');
        setAddModel('');
        setAddType('');
        setAddYear('');
        setAddPrice('');
        setAddMileage('');
        setAddDescription('');
        setAddColor('');
        setIsAdded(false)
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

    const handleAddPhoto = event => {
        setAddPhoto(event.target.value)
    }

    // Handle function for deleting car posting

    const handleDeleteCarPosting = async (id) => {
        setIsDelete(true)
        await deleteCarPosting(id)
        setIsDelete(false)
    }

       // Handle function for adding car photo

       const handleAddCarPhoto = async (event) => {
        event.preventDefault();
        setIsPhotoAdd(true)
        await createPhoto(editableId, addPhoto)
        setAddPhoto('')
        setIsPhotoAdd(false)
    }

    // Handle functions for car post editing

    const handleEditable = (id) => {
        if (editable === false) {
            setEditable(true)
            setEditableId(id)
            return
        }
        setEditable(false)
        setEditableId('')
    }

    const handleEditCarPosting = async (event) => {
        event.preventDefault();
        setIsUpdate(true)
        await editCarPosting(editableId, editMake, editModel, editType, editYear, editPrice, editMileage, editDescription, editColor, editUsersId)
        setEditMake('');
        setEditModel('');
        setEditType('');
        setEditYear('');
        setEditPrice('');
        setEditMileage('');
        setEditDescription('');
        setEditColor('');
        setIsUpdate(false)
    }

    const handleEditMake = event => {
        setEditMake(event.target.value)
    }

    const handleEditModel = event => {
        setEditModel(event.target.value)
    }

    const handleEditType = event => {
        setEditType(event.target.value)
    }

    const handleEditYear = event => {
        setEditYear(event.target.value)
    }

    const handleEditPrice = event => {
        setEditPrice(event.target.value)
    }

    const handleEditMileage = event => {
        setEditMileage(event.target.value)
    }

    const handleEditDescription = event => {
        setEditDescription(event.target.value)
    }

    const handleEditColor = event => {
        setEditColor(event.target.value)
    }

    // Handle function for deleting car photo

    const handleDeleteCarPhoto = async (id) => {
       
        setIsPhotoDelete(true)
        await deletePhoto(id)
        setIsPhotoDelete(false)
    }

    useEffect(() => {
        refreshCars();
    }, [isDelete, isUpdate, isAdded, isPhotoDelete, isPhotoAdd]);

    return (
        <div className='app-container'>


            

            <h2>Admin Page </h2>

            <form id='createCarPosts' onSubmit={handleCreateNewCarPosting}>
                <h2>Add a new car:</h2>
                <p>Make: <select id='select1' className='select' onChange={handleAddMake}>
                    <option value=''>Make</option>
                    {makes.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
                </select>
                </p>
                <p>Model: <select id='select2' className='select' onChange={handleAddModel}>
                    <option value=''>Model</option>
                    {models.filter((model) => model.makeId == addMake).map((e, j) => (<option key={j} value={e.id}>{e.name}</option>))}
                </select>
                </p>
                <p>Type: <select id='select3' className='select' onChange={handleAddType}>
                    <option value=''>Type</option>
                    {types.map((e, j) => (<option key={j} value={e.id}>{e.name}</option>))}
                </select>
                </p>
                <p>Year: <input type='text' onChange={handleAddYear}></input></p>
                <p>Price: <input type='text' onChange={handleAddPrice}></input></p>
                <p>Mileage: <input type='text' onChange={handleAddMileage}></input></p>
                <p>Description: <input type='text' onChange={handleAddDescription}></input></p>
                <p>Color: <input type='text' onChange={handleAddColor}></input></p>
                {/* <p>UserId: </p> */}
                <div id='createpostbutton'><button className='button'>Create Posting</button></div>
            </form>

            <h2>Posted Cars</h2>
            {cars.map((e, i) => {

                return (<div key={i} className="carPosts">

                    <div className='makeandmodeldiv'>
                        <h3>{e.year}</h3> <h3>{makes.filter((make) => make.id === e.makeId)
                            .map((make) => (
                                <>{make.name} </>
                            ))}
                            {models.filter((model) => model.id === e.modelId)
                                .map((model) => (
                                    <> {model.name}</>
                                ))}</h3>
                    </div>
                    <div className='carPhoto'>{photos.filter((photo) => photo.carsId === e.id).map((p, i) => (<img className='carPhoto' key={i} src={p.image}></img>))}</div>
                    <div className='priceandmilesdiv'><h4>${e.price.toLocaleString("en-US")}</h4><h4>{e.mileage.toLocaleString("en-US")} miles</h4></div>
                    <div className='cardescription'>
                        "{e.description}"
                        <div className='typeandcolordiv'>
                            <>{types.filter((type) => type.id === e.typeId).map((type) => (
                                <div>{type.name}</div>
                            ))}</>
                            <div>{e.color}</div>
                        </div>
                    </div>
                    {/* <p>UserId: {e.usersId}</p> */}
                    <div id='deletepostbutton'><button className='button' id='editbutton' onClick={(event) => handleEditable(e.id)}>{editable && editableId === e.id ? " Close Edit" : "Edit"}</button><button id='deletebutton' className='button' onClick={() => handleDeleteCarPosting(e.id)}>Delete</button></div>

                    {editable && editableId === e.id ? 

                    <form id='editform'>

                        <h2>Edit:</h2>
                        <p>Make: <select id='select1' className='select' onChange={handleEditMake}>
                            <option value=''>Make</option>
                            {makes.map((e, i) => (<option key={i} value={e.id}>{e.name}</option>))}
                        </select>
                        </p>
                        <p>Model: <select id='select2' className='select' onChange={handleEditModel}>
                            <option value=''>Model</option>
                            {models.filter((model) => model.makeId == editMake).map((e, j) => (<option key={j} value={e.id}>{e.name}</option>))}
                        </select>
                        </p>
                        <p>Type: <select id='select3' className='select' onChange={handleEditType}>
                            <option value=''>Type</option>
                            {types.map((e, j) => (<option key={j} value={e.id}>{e.name}</option>))}
                        </select>
                        </p>
                        <p>Year: <input type='text' onChange={handleEditYear}></input></p>
                        <p>Price: <input type='text' onChange={handleEditPrice}></input></p>
                        <p>Mileage: <input type='text' onChange={handleEditMileage}></input></p>
                        <p>Description: <input type='text' onChange={handleEditDescription}></input></p>
                        <p>Color: <input type='text' onChange={handleEditColor}></input></p>
                        <p>Add Photo URL (plain text): <input type='text' onChange={handleAddPhoto}></input><button onClick={handleAddCarPhoto} className='button'>Add Photo</button></p>
                        <div id='postedPhotos'>{photos.filter((photo) => photo.carsId === e.id).map((p, i) => (<div id='editCarPhotoDiv' className='carPhoto'><img id='editCarPhoto' className='carPhoto' key={i} src={p.image}></img><button onClick={() => handleDeleteCarPhoto(p.id)} className='button'>Delete Photo</button></div>))}</div>
                        {/* <p>UserId: </p> */}
                        <div id='createpostbutton'><button onClick={handleEditCarPosting} className='button'>Update Posting</button></div>
                    </form>

                    : ""}

                </div>)
            })}
        </div>);
};

export default Admin;