class AuthUseCase {
  constructor(userRepository, bcrypt, tokenManager, func) {
    this._userRepository = userRepository;
    this._bcrypt = bcrypt;
    this._tokenManager = tokenManager;
    this._func = func;
  }
  async register(userData) {
    let result = {
      isSuccess: false,
      reason: "",
      statusCode: 400,
      data: null,
    };

    if (userData.password !== userData.confirmPassword) {
      result.reason = "password and confirm password not match";
      return result;
    }
    const verifyUsername = await this._userRepository.getUserByUsernameOrMsisdn(
      userData.username
    );

    const verifyMsisdn = await this._userRepository.getUserByUsernameOrMsisdn(
      userData.msisdn
    );
    if (verifyUsername !== null) {
      result.reason = "username is existing";
      return result;
    }
    if (verifyMsisdn !== null) {
      result.reason = "msisdn is existing";
      return result;
    }

    userData.password = this._bcrypt.hashSync(userData.password, 10);

    let checkMsisdn = this._func.verifyMsisdn(userData.msisdn);
    userData.msisdn = checkMsisdn;

    const newUser = await this._userRepository.createUser(userData);
    const userObj = {
      id: newUser.id,
      msisdn: newUser.msisdn,
      name: newUser.name,
      username: newUser.username,
      created_at: newUser.createdAt,
      updated_at: newUser.updatedAt,
    };
    const tokenManager = await this._tokenManager.generateToken(userObj);
    userObj.token = tokenManager;
    result.isSuccess = true;
    result.statusCode = 200;
    result.data = userObj;
    return result;
  }

  async login(userData) {
    let result = {
      isSuccess: false,
      statusCode: 404,
      reason: null,
      data: null,
    };
    const user = await this._userRepository.getUserByUsernameOrMsisdn(
      userData.username_or_msisdn
    );
    if (user === null) {
      result.reason = "username or password incorect";
      result.statusCode = 404;
      return result;
    }
    const comparePassword = await this._bcrypt.compareSync(
      userData.password,
      user.password
    );

    if (comparePassword === null) {
      result.reason = "username and password incorrect";
      result.statusCode = 400;
      return result;
    }

    const userObj = {
      id: user.id,
    };
    const tokenManager = await this._tokenManager.generateToken(userObj);
    userObj.token = tokenManager;

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = userObj;

    return result;
  }

  async verifyToken(id) {
    let result = {
      isSuccess: false,
      reason: "",
      statusCode: 400,
      data: null,
      token: null,
    };

    const user = await this._userRepository.getById(id);
    const privateKey = {
      result: user.id,
    };

    result.isSuccess = true;
    result.statusCode = 200;
    result.data = privateKey;
    return result;
  }
}

module.exports = AuthUseCase;
