const fs = require('fs');
const path = require('path');

const models = {};
const mongooseSchemas = {};

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const { name, mongooseSchema, initializeConfiguration, getModelClass } = require(path.join(__dirname, file));
    mongooseSchemas[name] = mongooseSchema;
    models[name] = { initializeConfiguration, getModelClass };
  });

// initialize all mongoose schemas
Object.values(models).forEach(({ initializeConfiguration }) => initializeConfiguration(mongooseSchemas));

// generate model class for all schemas
Object.entries(models).forEach(([key, { getModelClass }]) => {
  models[key] = getModelClass(mongooseSchemas);
});

// export all mongooseSchema as model.__mongooseSchemas__
models['__mongooseSchemas__'] = mongooseSchemas;

module.exports = models;

