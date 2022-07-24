const { failed } = require('../configs/response');

/**
 * Validate Schema
 */
exports.validateSchema = (schema, properties = 'body') => async (req, res, next) => {
  try {
    const { error } = schema.validate(req[properties], { abortEarly: false });

    const errorStrings = error?.details.map(({ message }) => message).join(', ').replace(/["]/g, '');

    if (errorStrings) {
      return failed({ res, message: errorStrings.split(', ') });
    }

    next();
  } catch (error) {
    console.log('message', error)
    return failed({ res, error });
  }
};
