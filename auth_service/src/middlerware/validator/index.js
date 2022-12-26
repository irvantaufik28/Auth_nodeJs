const { UserPayloadSchema } = require('./schema');
const resData = require('../../helper/response');

const UserPayloadValidator = {
  UserValidation: async (req, res, next) => {
    const { error } = UserPayloadSchema.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json(resData.failed(error.message, error.details));
    }

    next();
  },
};

module.exports = UserPayloadValidator;