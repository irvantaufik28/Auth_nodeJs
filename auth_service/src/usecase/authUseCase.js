class AuthUseCase {
    constructor(userRepository, bcrypt, tokenManager) {
      this._userRepository = userRepository;
      this._bcrypt = bcrypt;
      this._tokenManager = tokenManager;
    }
    async register(userData) {
        let result = {
          isSuccess: false,
          reason: "",
          statusCode: 400,
          data: null,
          token: null,
        };
        
        if (userData.password !== userData.confirmPassword) {
          result.reason = "password and confirm password not match";
          return result;
        }
        const verifyUsername = await this._userRepository.getUserByUsernameOrMsisdn(userData.username)
      
        const verifyMsisdn = await this._userRepository.getUserByUsernameOrMsisdn(userData.msisdn)
        if (verifyUsername !== null) {
          result.reason = "username is existing";
          return result;
        } 
        if (verifyMsisdn !== null) {
            result.reason = "msisdn is existing";
            return result;
        }

        userData.password = this.bcrypt.hashSync(userData.password, 10);
        let userRegister = await this._userRepository.createUser(userData);
        
        result.isSuccess = true;
        result.statusCode = 200;
        result.data = userRegister
        return result;
      }
}
  
  
  module.exports = AuthUseCase;