const { User } = require("../models");
const { Op } = require("sequelize");

class UserRepository {
  constructor() {
    this._UserModel = User;
  }

  async getUserByUsernameOrMsisdn(usernameOrMsisdn) {
    const result = await this._UserModel.findOne({
      where: {
        [Op.or]: [{ username: usernameOrMsisdn }, { msisdn: usernameOrMsisdn }],
      },
    });
    return result;
  }

  async createUser(user) {
    const result = await this._UserModel.create(user);
    return result
  }
}

module.exports = UserRepository;
