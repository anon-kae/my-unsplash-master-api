const logger = require('../configs/logger');
const { createPasswordHash, checkPassword } = require('../utils/constants/global');
/**
 * Upload Service
 */
class UploadService {
  /**
   * Constructor
   * @param UploadRepository
   */
  constructor({ UploadRepository }) {
    this.UploadRepository = UploadRepository;
  }

  /**
   * Find all photos
   * @param {String}      keyword
   * @param {Number}      page
   * @param {Number}      size
   * @param {Transaction} transaction
   * @return {Promise<*>}
   */
  async findAllPhotos({ keyword = '', page = 1, size= 10 }, transaction = null) {
    const { photos, pagination } = await this.UploadRepository.findAll({ keyword, page, size }, transaction);

    logger.debug(`Successfully find all ${pagination.count} photos`, { count: pagination.count });

    return { photos, pagination };
  }

  /**
   * Upload photo
   * @param {object} photo
   * @param transaction
   * @return {Promise<Media>}
   */
  async uploadPhoto({ label, photoUrl }, transaction = null) {
    const photo = await this.UploadRepository.create({ label, photoUrl }, transaction);

    logger.debug(`Successfully uploaded image label=${label} photoUrl=${photoUrl}`);

    return photo;
  }

  /**
   * Delete photo
   * @param {object} photo
   * @param transaction
   * @return {Promise<Media>}
   */
  async deletePhoto({ id }, transaction = null) {
    const findPhoto = await this.UploadRepository.findById(id, transaction);
    if(!findPhoto) {
      logger.error(`Not found photo by id=${id}`);
      return null
    }

    const photo = await this.UploadRepository.deleteById(id, transaction);

    logger.debug(`Successfully deleted photo id=${id}`);

    return photo;
  }
}

module.exports = UploadService;
