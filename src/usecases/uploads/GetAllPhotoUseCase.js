const joi = require('joi');
const runTransaction = require('../../utils/mongoose/runTransaction');
const logger = require('../../configs/logger');
/**
 * GetAll API UseCase
 */
class GetAllPhotoUseCase {
  /**
   * Constructor
   * @param UploadService
   * @param dbRepositories
   */
  constructor({ UploadService }, dbRepositories) {
    this.UploadService = UploadService;
    this.dbRepositories = dbRepositories;
  }

  /**
   * Validators
   */
  static getValidators = joi.object({
    keyword: joi.string().required().allow('').optional(),
    size: joi.number().required(),
    page: joi.number().required()
  });

  /**
   * Execute UseCase
   */
  async execute({ keyword, page, size }) {
    const uploadService = new this.UploadService(this.dbRepositories);

    return runTransaction(async (transaction) => {
      const photo = await uploadService.findAllPhotos({ keyword, page, size }, transaction);

      logger.info('Successfully get all photo');

      return photo;
    });
  }
}

module.exports = GetAllPhotoUseCase;
