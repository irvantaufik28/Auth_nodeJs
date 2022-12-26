require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const serverError = require("./middlerware/serverError")

const CourierRateRepository = require('./repository/courierRateRepository')
const CourierRateUsecase = require('./usecase/courierRateUsecase')

const courierRateRouter = require('./routes/courierRateRoutes')
const courierRateUC = new CourierRateUsecase(new CourierRateRepository)

const app = express();
app.use((req, res, next) => {
  req.courierRateUC = courierRateUC
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", courierRateRouter);
app.use(serverError);
const swaggerDocument = require('./docs/docs.json');
app.use(
  '/docs',
  swaggerUi.serveFiles(swaggerDocument),
  swaggerUi.setup(swaggerDocument),
);
module.exports = app;
