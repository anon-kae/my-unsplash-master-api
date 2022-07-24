const fs = require('fs');
const path = require('path');
const express = require('express');

// create a router
const router = express.Router();

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const subRouter = require(path.join(__dirname, file));
    router.use(subRouter);
  });

module.exports = router;
