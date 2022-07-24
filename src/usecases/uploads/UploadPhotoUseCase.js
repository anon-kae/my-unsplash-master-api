const joi = require('joi');
const ApiError = require('../../utils/ApiError');
const httpStatus = require('http-status');
const { constants } = require('../../configs');
const { unlinkFile, getPathImage } = require('../../utils/constants/global');
const runTransaction = require('../../utils/mongoose/runTransaction');
const logger = require('../../configs/logger');
/**
 * Upload API UseCase
 */
class UploadPhotoUseCase {
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
    label: joi.string().required(),
    photoUrl: joi.string().regex(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)$/).required()
  });

  /**
   * Execute UseCase
   */
  async execute(label, photoUrl) {
    const uploadService = new this.UploadService(this.dbRepositories);

    return runTransaction(async (transaction) => {
      const photo = await uploadService.uploadPhoto({ label, photoUrl }, transaction);

      logger.info(`Successfully uploaded image photoUrl=${photoUrl} label=${label}`);

      return photo;
    });
  }
}

module.exports = UploadPhotoUseCase;
