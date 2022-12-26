class CourierRateUsecase {
  constructor(courierRateRepository) {
    this._courierRateRepository = courierRateRepository;
  }

  async createCourierRate(requestData) {
    const result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const payload = {
      logistic_name: requestData.logistic_name,
      destination_name: requestData.destination_name,
      origin_name: requestData.origin_name,
    };

    const upperCasedLogisticData = {};

    for (const key in payload) {
      upperCasedLogisticData[key] = payload[key].toUpperCase();
    }
    upperCasedLogisticData.amount = requestData.amount;
    upperCasedLogisticData.duration = requestData.duration;

    const logistic = await this._courierRateRepository.create(
      upperCasedLogisticData
    );

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = logistic;

    return result;
  }

  async getAllCourierRate(params = {}) {
    const result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: [],
    };

    const courierRates = await this._courierRateRepository.getAll(params);

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = courierRates;

    return result;
  }

  async getCourierRatesByOriginDestination(params = {}) {
    const result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: [],
    };

    const condition = {
      origin_name: params.origin_name,
      destination_name: params.destination_name
    }

    const courierRates = await this._courierRateRepository.getByOriginDestination(condition);

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = courierRates;

    return result;
  }

  async getCourierRateById(id) {
    const result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const courierRate = await this._courierRateRepository.getById(id);

    if (courierRate === null) {
      result.statusCode = 404;
      result.reason = "courier rate not found";
      return result;
    }

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = courierRate;

    return result;
  }

  async updateCourierRate(requestData, id) {
    const result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
      data: null,
    };

    const courierRate = await this._courierRateRepository.getById(id);

    if (courierRate === null) {
      result.statusCode = 404;
      result.reason = "courier rate not found";
      return result;
    }

    const strLogisticData = {
      logistic_name: requestData.logistic_name,
      destination_name: requestData.destination_name,
      origin_name: requestData.origin_name,
    };
    const upperCasedLogisticData = {};

    for (const key in strLogisticData) {
      upperCasedLogisticData[key] = strLogisticData[key].toUpperCase();
    }
    upperCasedLogisticData.amount = requestData.amount;
    upperCasedLogisticData.duration = requestData.duration;

    await this._courierRateRepository.update(upperCasedLogisticData, id);

    const updatedCourierRate = await this._courierRateRepository.getById(id);

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = updatedCourierRate;

    return result;
  }

  async deleteCourierRate(id) {
    const result = {
      isSuccess: false,
      statusCode: null,
      reason: null,
    };

    const courierRate = await this._courierRateRepository.getById(id);

    if (courierRate === null) {
      result.statusCode = 404;
      result.reason = "courier rate not found";
      return result;
    }

    await this._courierRateRepository.delete(id);

    result.isSuccess = true;
    result.statusCode = 200;
    return result;
  }
}

module.exports = CourierRateUsecase;
