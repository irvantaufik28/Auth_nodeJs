class logisticUsecase {
  constructor(logisticRepository) {
    this._logisticRepository = logisticRepository;
  }

  async createLogistic(logisticData) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const strLogisticData = {
      logistic_name: logisticData.logistic_name,
      destination_name: logisticData.destination_name,
      origin_name: logisticData.origin_name,
    };
    let upperCased_logisticData = {};

    for (let key in strLogisticData) {
      upperCased_logisticData[key] = strLogisticData[key].toUpperCase();
    }
    upperCased_logisticData.amount = logisticData.amount;
    upperCased_logisticData.duration = logisticData.duration;

    const logistic = await this._logisticRepository.create(
      upperCased_logisticData
    );

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = logistic;

    return result;
  }

  async getAllLogistc(origin_name, destination_name) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: [],
    };

    const logistics = await this._logisticRepository.getAll(
      origin_name.toUpperCase(),
      destination_name.toUpperCase()
    );

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = logistics;

    return result;
  }

  async getLogisticById(id) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const logistic = await this._logisticRepository.getById(id);

    if (logistic === null) {
      result.statusCode = 404;
      result.reason = "logistic not found";
      return result;
    }

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = logistic;

    return result;
  }

  async updateLogistic(logisticData, id) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const logistic = await this._logisticRepository.getById(id);

    if (logistic === null) {
      result.statusCode = 404;
      result.reason = "logistic not found";
      return result;
    }

    const strLogisticData = {
      logistic_name: logisticData.logistic_name,
      destination_name: logisticData.destination_name,
      origin_name: logisticData.origin_name,
    };
    let upperCased_logisticData = {};

    for (let key in strLogisticData) {
      upperCased_logisticData[key] = strLogisticData[key].toUpperCase();
    }
    upperCased_logisticData.amount = logisticData.amount;
    upperCased_logisticData.duration = logisticData.duration;

    await this._logisticRepository.update(upperCased_logisticData, id);

    const updateLogistic = await this._logisticRepository.getById(id);

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = updateLogistic;

    return result;
  }

  async deleteLogistic(id) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
    };

    const logistic = await this._logisticRepository.getById(id);

    if (logistic === null) {
      result.statusCode = 404;
      result.reason = "logistic not found";
      return result;
    }

    await this._logisticRepository.delete(id);

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }
}

module.exports = logisticUsecase;
