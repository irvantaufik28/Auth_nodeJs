const { Op } = require("sequelize");
const { CourierRate, Sequelize, sequelize } = require("../models");

class CourierRateRepository {
  constructor() {
    this._CourierRateRepository = CourierRate;
  }

  async getAll(condition, options) {
    const result = await this._CourierRateRepository.findAll({
      where: condition,
      ...options
    });
    return result;
  }

  async getByOriginDestination(condition, options) {
    const result = await this._CourierRateRepository.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(sequelize.fn('lower', sequelize.col('origin_name')), condition.origin_name.toLowerCase()),
          Sequelize.where(sequelize.fn('lower', sequelize.col('destination_name')), condition.destination_name.toLowerCase()),
        ]
      },
      ...options
    });
    return result;
  }

  async getById(id) {
    const result = await this._CourierRateRepository.findOne({
      where: { id },
    });
    return result;
  }

  async create(logistic) {
    const result = await this._CourierRateRepository.create(logistic);
    return result;
  }

  async update(logistic, id) {
    const result = await this._CourierRateRepository.update(logistic, {
      where: {
        id,
      },
    });
    return result;
  }

  async delete(id) {
    const result = await this._CourierRateRepository.destroy({
      where: {
        id,
      },
    });
    return result;
  }
}

module.exports = CourierRateRepository;
