const express = require('express');
const multer = require('../../middlewares/multer');
const { validateSchema } = require('../../middlewares/validateSchema');
const uploadController = require('../../controllers/UploadController');
const router = express.Router();

router.get('/upload',
  validateSchema(uploadController.getAllPhotoValidations, 'query'),
  uploadController.getAllPhoto);

router.post('/upload',
  validateSchema(uploadController.uploadPhotoValidations),
  uploadController.uploadPhoto);

router.delete('/upload',
  validateSchema(uploadController.deletePhotoValidations, 'query'),
  uploadController.deletePhoto);

module.exports = router;
