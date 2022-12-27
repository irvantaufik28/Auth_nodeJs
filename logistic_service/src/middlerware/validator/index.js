const { CourierRateByOriginDestSchema } = require('./schema');
const resData = require('../../helper/response');

const CourierRateValidator = {
  getByOriginDestValidation: async (req, res, next) => {
    const { error } = CourierRateByOriginDestSchema.validate(req.query);

    if (error) {
      return res
        .status(400)
        .json(resData.failed(error.message, error.details));
    }

    next();
  },
};

module.exports = CourierRateValidator;