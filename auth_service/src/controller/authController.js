const resData = require('../helper/response');

module.exports = {
  register: async (req, res, next) => {
    try {
      const user = {
        msisdn: req.body.msisdn,
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      };

      const result = await req.authUC.register(user);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  }, 

  login: async (req, res, next) => {
    try {
      const user = {
        username_or_msisdn: req.body.username_or_msisdn,
        password: req.body.password,
      };

      const result = await req.authUC.login(user);

      if (!result.isSuccess) {
        return res.status(result.statusCode).json(resData.failed(result.reason));
      }

      res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
};