require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const serverError = require("./middlerware/serverError")

const LogisticRepository = require('./repository/logisticRepository')
const LogisticUsecase = require('./usecase/logisticUsecase')

const logisticRouter = require('./routes/logisticRoutes')
const logisticUC = new LogisticUsecase(new LogisticRepository)

const app = express();
app.use((req, res, next) => {
  req.logisticUC = logisticUC
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", logisticRouter);
app.use(serverError);
const swaggerDocument = require('./docs/docs.json');
app.use(
  '/docs',
  swaggerUi.serveFiles(swaggerDocument),
  swaggerUi.setup(swaggerDocument),
);
module.exports = app;
