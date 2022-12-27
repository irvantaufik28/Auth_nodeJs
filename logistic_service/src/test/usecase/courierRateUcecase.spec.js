const CourierRateUseCase = require("../../usecase/courierRateUsecase");
const mockLogistic = require("../mock/logistic.mock");

let mockCourierRateReturn = {};

let courirRateUC = null;

describe("courier Rate Test", () => {
  beforeEach(() => {
    mockCourierRateReturn = {
      create: jest.fn().mockReturnValue(mockLogistic.logistic),
      getAll: jest.fn().mockReturnValue([mockLogistic.logistic]),
      getByOriginDestination: jest.fn().mockReturnValue(mockLogistic.logistic),
      getById: jest.fn().mockReturnValue(mockLogistic.logistic),
      update: jest.fn().mockReturnValue(mockLogistic.logistic),
      delete: jest.fn().mockReturnValue(true),
    };
    courirRateUC = new CourierRateUseCase(mockCourierRateReturn);
  });
  describe("create logistic", () => {
    test("should isSuccess = true statusCode = 200, and type data is obj", async () => {
      let res = await courirRateUC.createCourierRate(mockLogistic.logistic);

      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
      expect(res.data).toHaveProperty("id");
      expect(res.data).toHaveProperty("amount");
      expect(res.data).toHaveProperty("destination_name");
      expect(res.data).toHaveProperty("origin_name");
      expect(res.data).toHaveProperty("duration");
    });
  });
  describe("get All Courier Rate logistic", () => {
    test("should isSuccess = true statusCode = 200, and type data is aray", async () => {
      let res = await courirRateUC.getAllCourierRate(mockLogistic.logistic);

      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.data)).toBeTruthy();
      expect(res.data[0]).toHaveProperty("id");
      expect(res.data[0]).toHaveProperty("amount");
      expect(res.data[0]).toHaveProperty("destination_name");
      expect(res.data[0]).toHaveProperty("origin_name");
      expect(res.data[0]).toHaveProperty("duration");
    });
  });

  describe(" get Courier Rates By Origin Destination", () => {
    const params = {
      origin_name: "BANDUNG",
      destination_name: "SURABAYA",
    };

    test("should isSuccess = true statusCode = 200, and type data is object", async () => {
      let res = await courirRateUC.getCourierRatesByOriginDestination(params);
      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
      expect(res.data).toHaveProperty("id");
      expect(res.data).toHaveProperty("amount");
      expect(res.data).toHaveProperty("destination_name");
      expect(res.data).toHaveProperty("origin_name");
      expect(res.data).toHaveProperty("duration");
    });
  });

  describe("get Courier Rate By Id", () => {
    test("should isSuccess = true statusCode = 200, and type data is object", async () => {
      let res = await courirRateUC.getCourierRateById(1);
      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
      expect(res.data).toHaveProperty("id");
      expect(res.data).toHaveProperty("amount");
      expect(res.data).toHaveProperty("destination_name");
      expect(res.data).toHaveProperty("origin_name");
      expect(res.data).toHaveProperty("duration");
    });
    test("should isSuccess = fale statusCode = 404", async () => {
      mockCourierRateReturn.getById = jest.fn().mockReturnValue(null);
      courirRateUC = new CourierRateUseCase(mockCourierRateReturn);
      let res = await courirRateUC.getCourierRateById(1);
      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(404);
      expect(res.reason).toEqual("courier rate not found");
    });
  });

  describe("update Courier Rate", () => {
    test("should isSuccess = true statusCode = 200", async () => {
      let res = await courirRateUC.updateCourierRate(mockLogistic.logistic);
      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
      expect(res.data).toHaveProperty("id");
      expect(res.data).toHaveProperty("amount");
      expect(res.data).toHaveProperty("destination_name");
      expect(res.data).toHaveProperty("origin_name");
      expect(res.data).toHaveProperty("duration");
    });
    test("should isSuccess = fale statusCode = 404", async () => {
      mockCourierRateReturn.getById = jest.fn().mockReturnValue(null);
      courirRateUC = new CourierRateUseCase(mockCourierRateReturn);
      let res = await courirRateUC.updateCourierRate(mockLogistic.logistic);
      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(404);
      expect(res.reason).toEqual("courier rate not found");
    });
  });
  describe("delete Courier Rate", () => {
    test("should isSuccess = true statusCode = 200", async () => {
      let res = await courirRateUC.deleteCourierRate(1);
      expect(res.isSuccess).toBeTruthy();
      expect(res.statusCode).toEqual(200);
   
      
    });
    test("should isSuccess = fale statusCode = 404", async () => {
      mockCourierRateReturn.getById = jest.fn().mockReturnValue(null);
      courirRateUC = new CourierRateUseCase(mockCourierRateReturn);
      let res = await courirRateUC.deleteCourierRate(1);
      expect(res.isSuccess).toBeFalsy();
      expect(res.statusCode).toEqual(404);
      expect(res.reason).toEqual("courier rate not found");
    });
  });
});
