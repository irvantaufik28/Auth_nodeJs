const AuthUseCase = require("../../usecase/authUseCase");
const userMock = require("../mock/user.mock");

let mockUserReturn = {};
let authUC = null;

describe("auth test", () => {
  beforeEach(() => {
    mockUserReturn = {
      getUserByUsernameOrMsisdn: jest.fn().mockReturnValue(userMock.user),
      createUser: jest.fn().mockReturnValue(userMock.user),
      getById: jest.fn().mockReturnValue(userMock.user),
    };
    bcrypt = {
      compareSync: jest.fn().mockReturnValue(true),
      hashSync: jest
        .fn()
        .mockReturnValue("sdjsdkjnfjfw&*23672(%^SHGHGSjhsjkh87623"),
    };
    tokenManager = {
      generateToken: jest.fn()
        .mockReturnValue(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
            eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
            SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`),
    };
    func = {
      verifyMsisdn: jest.fn().mockReturnValue(userMock.user.msisdn),
    };
    authUC = new AuthUseCase(mockUserReturn, bcrypt, tokenManager, func);
  });
  describe("login test", () => {
    const loginValue = {
      username: "irvantaufik8",
      password: "inipassword",
    };
    test("should isSuccess true , statusCode is 200 and data is valid ", async () => {
      const res = await authUC.login(loginValue);

      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
    });
  });
  test("should isSuccess false , statusCode is 404 ", async () => {
    mockUserReturn.getUserByUsernameOrMsisdn = jest.fn().mockReturnValue(null);
    authUC = new AuthUseCase(mockUserReturn, bcrypt, tokenManager, func);
    const loginValue = {
      username: "irvantaufik8",
      password: "inipassword",
    };
    const res = await authUC.login(loginValue);

    expect(res.isSuccess).toBeFalsy();
    expect(res.statusCode).toEqual(404);
    expect(res.reason).toEqual("username or password incorect");
  });
  test("should isSuccess false , statusCode is 400 ", async () => {
    bcrypt.compareSync = jest.fn().mockReturnValue(null);
    authUC = new AuthUseCase(mockUserReturn, bcrypt, tokenManager, func);
    const loginValue = {
      username: "irvantaufik8",
      password: "inipassword",
    };
    const res = await authUC.login(loginValue);

    expect(res.isSuccess).toBeFalsy();
    expect(res.statusCode).toEqual(400);
    expect(res.reason).toEqual("username and password incorrect");
  });
  describe("Register test", () => {
    const user = {
      id: "b4151cf6-d93f-47f7-84e4-f016def8bc01",
      msisdn: "62883156661",
      name: "irvan taufik",
      username: "irvantaufik30",
      password: "admin",
      confirmPassword: "admin",
      createdAt: "2022-09-07 09:36:06.000 +0700",
      updatedAt: "2022-09-07 09:36:08.000 +0700",
    };

    test("should isSuccess true , statusCode is 200 and data is valid ", async () => {
      mockUserReturn.getUserByUsernameOrMsisdn = jest
        .fn()
        .mockReturnValue(null);
      authUC = new AuthUseCase(mockUserReturn, bcrypt, tokenManager, func);
      const res = await authUC.register(user);
      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
    });
    test("should isSuccess false , statusCode is 400 ", async () => {
      const user = {
        id: "b4151cf6-d93f-47f7-84e4-f016def8bc01",
        msisdn: "62883156661",
        name: "irvan taufik",
        username: "irvantaufik30",
        password: "admin",
        confirmPassword: "admin",
        createdAt: "2022-09-07 09:36:06.000 +0700",
        updatedAt: "2022-09-07 09:36:08.000 +0700",
      };
      const res = await authUC.register(user);
      console.log(res);
      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(400);
      expect(res.reason).toEqual("username is existing");
    });
    test("should isSuccess false , statusCode is 400 ", async () => {
      const user = {
        id: "b4151cf6-d93f-47f7-84e4-f016def8bc01",
        msisdn: "62883156661",
        name: "irvan taufik",
        username: "irvantaufik30",
        password: "salah",
        confirmPassword: "admin",
        createdAt: "2022-09-07 09:36:06.000 +0700",
        updatedAt: "2022-09-07 09:36:08.000 +0700",
      };
      const res = await authUC.register(user);
      console.log(res);
      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(400);
      expect(res.reason).toEqual("password and confirm password not match");
    });
  });
  describe("VerifyToken test", () => {
    test("should isSuccess True , statusCode is 200", async () => {
      const res = await authUC.verifyToken(
        "b4151cf6-d93f-47f7-84e4-f016def8bc01"
      );
      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
    });
  });
});
