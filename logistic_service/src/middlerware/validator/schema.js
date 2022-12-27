const Joi = require("joi");

const CourierRateByOriginDestSchema = Joi.object({
  origin_name: Joi.string().required(),
  destination_name: Joi.string().required(),
}).options({ abortEarly: false });

module.exports = { CourierRateByOriginDestSchema };
