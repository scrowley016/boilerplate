const express = require('express');
const apiRouter = express.Router();

const {
    createPhoto,
    getAllPhotos,
    getPhotoById,
    getPhotoByCarsId,
    deletePhoto
} = require('../db/photos');


// Get all photos
apiRouter.get('/', async (req, res, next) => {
    try {
        const photos = await getAllPhotos()

    res.send(
        photos
    )
} catch(error) {
    next(error)
}
});

// Add new photo
apiRouter.post('/', async (req, res, next) => {
   try{
    const {carsId, image} = req.body;

    const photos = await createPhoto({carsId, image})

    res.send(
        photos
    )
}catch (error){
    next(error)
}
});


apiRouter.delete('/:photoId', async (req, res, next) => {
    try{
        console.log("test3")
    const id = req.params.photoId;
    const removePhoto = await deletePhoto(id);

    res.send(removePhoto);
  
    }catch (error){
        next(error)
    }
});


module.exports = apiRouter;