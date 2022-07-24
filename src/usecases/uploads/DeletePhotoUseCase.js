const joi = require('joi');
const runTransaction = require('../../utils/mongoose/runTransaction');
const logger = require('../../configs/logger');
/**
 * Delete API UseCase
 */
class DeletePhotoUseCase {
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
    id: joi.string().required().guid({ version: 'uuidv4' }),
  });

  /**
   * Execute UseCase
   */
  async execute(id) {
    const uploadService = new this.UploadService(this.dbRepositories);

    return runTransaction(async (transaction) => {
      const photo = await uploadService.deletePhoto({ id }, transaction);

      logger.info(`Successfully deleted image id=${id}`);

      return photo;
    });
  }
}

module.exports = DeletePhotoUseCase;
