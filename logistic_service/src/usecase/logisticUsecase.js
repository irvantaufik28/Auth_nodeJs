class logisticUsecase {
  constructor(logisticRepository) {
    this._logisticRepository = logisticRepository;
  }

  async createLogitic(logisticData) {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    let upperCased_logisticData = {};

    for (let key in logisticData) {
      upperCased[key] = logisticData[key].toUpperCase();
    }
    const logistic = await this._logisticRepository.create(
      upperCased_logisticData
    );

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = logistic;

    return result;
  }

  async getAllLogistc() {
    let result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: [],
    };

    const logistics = await this._logisticRepository.getAll();

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = logistics;

    return result;
  }

  async getById(id) {
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

  async UpdateLogistic(logisticData, id) {
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

    let upperCased_logisticData = {};

    for (let key in logisticData) {
      upperCased[key] = logisticData[key].toUpperCase();
    }

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
