const resData = require("../helper/response");

module.exports = {
  getAllCourierRate: async (req, res, next) => {
    /*
     #swagger.tags = ['Logistic']
   */
    try {

      const params = req.query
      const result = await req.courierRateUC.getAllCourierRate(params);

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  getCourierRatesByOriginDestination: async (req, res, next) => {
    /*
     #swagger.tags = ['Logistic']
   */
    try {

      const params = {
        origin_name: req.query.origin_name,
        destination_name: req.query.destination_name
      }

      const result = await req.courierRateUC.getCourierRatesByOriginDestination(params);

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  getCourierRateById: async (req, res, next) => {
    /*
     #swagger.tags = ['Logistic']
   */
    try {
      const { id } = req.params;

      const result = await req.courierRateUC.getCourierRateById(id);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  createCourierRate: async (req, res, next) => {
    try {
      /*
      #swagger.tags = ['Logistic']
    */
      const logistic = {
        logistic_name: req.body.logistic_name,
        amount: req.body.amount,
        destination_name: req.body.destination_name,
        origin_name: req.body.origin_name,
        duration: req.body.duration,
      };

      const result = await req.courierRateUC.createCourierRate(logistic);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  updateCourierRate: async (req, res, next) => {
    /*
     #swagger.tags = ['Logistic']
   */
    try {
      const { id } = req.params;

      const logistic = {
        logistic_name: req.body.logistic_name,
        amount: req.body.amount,
        destination_name: req.body.destination_name,
        origin_name: req.body.origin_name,
        duration: req.body.duration,
      };

      const result = await req.courierRateUC.updateCourierRate(logistic, id);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  deleteCourierRate: async (req, res, next) => {
    /*
     #swagger.tags = ['Logistic']
   */
    try {
      const { id } = req.params;

      const result = await req.courierRateUC.deleteCourierRate(id);

      if (!result.isSuccess) {
        return res
          .status(result.statusCode)
          .json(resData.failed(result.reason));
      }

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },
};
