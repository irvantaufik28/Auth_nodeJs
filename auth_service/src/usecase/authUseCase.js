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

        userData.password = this._bcrypt.hashSync(userData.password, 10);

        let newMsisdn = ''
        let msisdnValue = userData.msisdn.split('')
        if (msisdnValue[0] === "0") {
          let msidnSplit = userData.msisdn.split('')
          msidnSplit.splice(0,1, "62")
          newMsisdn = msidnSplit.join('')
        } else if (msisdnValue[0] !== "6" && msisdnValue[1] !== "2" ) {
          let msidnSplit = userData.msisdn.split('')
          msidnSplit.splice(0,0, "62")
          newMsisdn = msidnSplit.join('')
        } else {
          newMsisdn = userData.msisdn
        }

        userData.msisdn = newMsisdn
       
        let userRegister = await this._userRepository.createUser(userData);

        result.isSuccess = true;
        result.statusCode = 200;
        result.data = userRegister
        return result;
      }


      async login(userData) {
        let result = {
          isSuccess: false,
          statusCode: 404,
          reason: null,
          data: null,
          token : null,
        };
        const user = await this._userRepository.getUserByUsernameOrMsisdn(userData.username_or_msisdn);
        if (user === null) {
          result.reason = 'username or password incorect';
          result.statusCode = 404;
          return result;
        }
        const comparePassword = await this._bcrypt.compareSync(userData.password, user.password);
    
        if (comparePassword === null) {
          result.reason = 'username and password incorrect';
          result.statusCode = 400;
          return result;
        }
    
        const userObj = {
          id: user.id,
          msisdn: user.msisdn,
          name: user.name,
          username: user.username,
          created_at: user.createdAt,
          updated_at: user.updatedAt,
        };
        const tokenManager = await this._tokenManager.generateToken(userObj);
    
        result.isSuccess = true;
        result.statusCode = 200;
        result.data = userObj;
        result.token = tokenManager;
    
        return result;
      }
}
  
  
  module.exports = AuthUseCase;