const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const usecases = {};
fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const UseCase = require(path.join(__dirname, file));
    usecases[UseCase.name] = UseCase;
  });

module.exports = usecases;
