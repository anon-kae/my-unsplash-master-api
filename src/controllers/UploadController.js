const {
  UploadPhotoUseCase,
  GetAllPhotoUseCase,
  DeletePhotoUseCase
} = require('../usecases/uploads');

const { success } = require('../configs/response');
const services = require('../services');
const repositories = require('../repositories');

exports.getAllPhotoValidations = GetAllPhotoUseCase.getValidators;
exports.getAllPhoto = async (req, res, next) => {
  try {
    const { keyword, page, size } = req.query;
    const useCase = new GetAllPhotoUseCase(services, repositories);
    const result = await useCase.execute({ keyword, page, size });

    success({ res, message: 'successfully', result, code: 200 });
  } catch (err) {
    next(err);
  }
};

exports.uploadPhotoValidations = UploadPhotoUseCase.getValidators;
exports.uploadPhoto = async (req, res, next) => {
  try {
    const { label, photoUrl } = req.body;
    const useCase = new UploadPhotoUseCase(services, repositories);
    const result = await useCase.execute(label, photoUrl);

    success({ res, message: 'successfully', result, code: 200 });
  } catch (err) {
    next(err);
  }
};

exports.deletePhotoValidations = DeletePhotoUseCase.getValidators;
exports.deletePhoto = async (req, res, next) => {
  try {
    console.log('req.query', req.query)
    const { id } = req.query;
    const useCase = new DeletePhotoUseCase(services, repositories);
    const result = await useCase.execute(id);

    success({ res, message: 'successfully', result, code: 200 });
  } catch (err) {
    next(err);
  }
};
