const { Logistic } = require("../models");
const { Op } = require("sequelize");

class LogisticRepository {
  constructor() {
    this._LogisticRepository = Logistic;
  }

  async getAll(origin_name, destination_name) {
    const result = await this._LogisticRepository.findAll({
      where: { origin_name, destination_name },
    });
    return result;
  }

  async getById(id) {
    const result = await this._LogisticRepository.findOne({
      where: { id },
    });
    return result;
  }

  async create(logistic) {
    const result = await this._LogisticRepository.create(logistic);
    return result;
  }

  async update(logistic, id) {
    const result = await this._LogisticRepository.update(logistic, {
      where: {
        id,
      },
    });
    return result;
  }

  async delete(id) {
    const result = await this._LogisticRepository.destroy({
      where: {
        id,
      },
    });
    return result;
  }
}

module.exports = LogisticRepository;
