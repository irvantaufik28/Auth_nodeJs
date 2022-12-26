const Joi = require("joi");

const UserPayloadSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  username: Joi.string().min(6).max(30).required(),
  msisdn: Joi.string()
    .regex(/^[0-9]*$/)
    .required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6),
}).options({ abortEarly: false });

module.exports = { UserPayloadSchema };
