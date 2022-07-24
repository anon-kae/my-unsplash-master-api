const { GetApiIdentityUseCase } = require('../usecases/root');

exports.getApiIdentityValidations = GetApiIdentityUseCase.getValidators();
exports.getApiIdentity = async (req, res, next) => {
  try {
    const useCase = new GetApiIdentityUseCase();
    const result = await useCase.execute();

    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
};
