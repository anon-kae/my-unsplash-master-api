const generateMongooseSchema = require('../utils/mongoose/generateSchema');

/**
 * Model Media
 */
class Photo {
  /**
   * Convert to JSON
   */
  toJSON() {
    return {
      id: this.id,
      label: this.label,
      photoUrl: this.photoUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = generateMongooseSchema(() => ({
  label: String,
  photoUrl: String
}), {
  Model: Photo,
  indexes: [
    [{ 'id': 1 }, { 'unique': true }],
    [{ 'createdAt': -1 }],
    [{ 'updatedAt': -1 }],
    // [{ 'label': 1 }],
    [{ 'label': 'text' }]
  ]
});

