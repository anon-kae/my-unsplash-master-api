const express = require('express');
const rootController = require('../../controllers/RootController');

const router = express.Router();

router.get('/',
  rootController.getApiIdentity);

module.exports = router;
