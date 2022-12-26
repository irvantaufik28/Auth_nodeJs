const resData = require("../helper/response");

module.exports = {
  createLogistic: async (req, res, next) => {
    try {
      const logistic = {
        logistic_name: req.body.logistic_name,
        amount: req.body.amount,
        destination_name: req.body.destination_name,
        origin_name: req.body.origin_name,
        duration: req.body.duration,
      };

      const result = await req.logisticUC.createLogistic(logistic);

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

  getAllLogistc: async (req, res, next) => {
    try {
      const { origin_name } = req.query;
      const { destination_name } = req.query;

      const result = await req.logisticUC.getAllLogistc(
        origin_name,
        destination_name
      );

      return res.status(result.statusCode).json(resData.success(result.data));
    } catch (error) {
      next(error);
    }
  },

  getLogisticById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await req.logisticUC.getLogisticById(id);

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

  deleteLogistic: async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await req.logisticUC.deleteLogistic(id);

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

  updateLogistic: async (req, res, next) => {
    try {
      const { id } = req.params;

      const logistic = {
        logistic_name: req.body.logistic_name,
        amount: req.body.amount,
        destination_name: req.body.destination_name,
        origin_name: req.body.origin_name,
        duration: req.body.duration,
      };

      const result = await req.logisticUC.updateLogistic(logistic, id);

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
