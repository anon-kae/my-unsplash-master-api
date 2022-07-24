const { Photo } = require('../models');

/**
 * Upload Repository
 */
class UploadRepository {
  /**
   * Create a photo
   * @param {object} photo
   * @param session
   * @return {Promise<*>}
   */
  static async create({ label, photoUrl, password }, session = null) {
    const [photo] = await Photo.create([{ label, photoUrl, password }], { session });
    return photo;
  }

  /**
   * Find by id
   * @param {string} id
   * @param session
   * @return {Promise<*>}
   */
  static async findById(id, session = null) {
    return Photo.findOne({ id }, {}, { session });
  }

    /**
   * Delete
   * @param {String}    id
   * @param {Session}   session
   * @returns
   */
    static async deleteById(id, session = null) {
      return Photo.deleteOne({ id }, { session });
    }

    /**
   * Find all photos
   * @param {String}    keyword
   * @param {Number}    page
   * @param {Number}    size
   * @param {Session}   session
   * @returns
   */
  static async findAll({ keyword = '', page = 1, size = 10 }, session = null) {
    const limit = (size > 0) ? size : DEFAULT_LIMIT;
    const search = new RegExp(keyword, 'i')
    const query = { label: search };
    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
      options: { session },
      customLabels: {
        totalDocs: 'total',
        limit: 'pageSize',
      },
    };
    const photos = await Photo.paginate(query, options);
    return {
      photos: photos.docs,
      pagination: {
        total: photos.total,
        totalPages: photos.totalPages,
        page: photos.page,
        pageSize: photos.pageSize
      }
    };
  }
}

module.exports = UploadRepository;
