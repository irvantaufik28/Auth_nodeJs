const { Logistic } = require("../models");

class LogisticRepository {
  constructor() {
    this._LogisticRepository = Logistic;
  }

  async getAll() {
    const result = await this._LogisticRepository.findAll();
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
