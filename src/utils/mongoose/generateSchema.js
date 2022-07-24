const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');
const { v4: uuidV4 } = require('uuid');

/**
 * Generate mongoose.Schema instance, with mongoose model
 * @param schemaFactory
 * @param Model
 * @param collection
 * @param indexes
 * @return {{mongooseSchema, name, model: (*)}}
 */
module.exports = function(schemaFactory = function() {}, {
  Model,
  collection = null,
  indexes = []
}) {
  const options = {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    },
    autoIndex: false,
    excludeIndexes: true,
  };

  if (collection) options.collection = collection;

  const mongooseSchema = new mongoose.Schema({ id: { type: String, default: uuidV4 } }, options);

  /**
   * Initialize mongoose model configuration
   * @param mongooseSchemas
   * @return {*} mongoose model
   */
  function initializeConfiguration(mongooseSchemas) {
    mongooseSchema.add(schemaFactory(mongooseSchemas));

    indexes.forEach((params) => mongooseSchema.index(...params));
    mongooseSchema.plugin(mongoosePaginate);
    mongooseSchema.plugin(mongooseAggregatePaginate);
    mongooseSchema.loadClass(Model);
  }

  /**
   * Get mongoose model
   * @return {*}
   */
  function getModelClass() {
    return mongoose.model(Model.name, mongooseSchema);
  }

  return {
    name: Model.name,
    mongooseSchema,
    initializeConfiguration,
    getModelClass,
  };
};
