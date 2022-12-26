require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const tokenManager = require("./helper/tokenManger");
const swaggerUi = require('swagger-ui-express');
const func = require('./libs/function')
const serverError = require("./middlerware/serverError");
const UserRepository = require("./repository/userRepository");
const AuthUseCase = require("./usecase/authUseCase");

const authUC = new AuthUseCase(new UserRepository(), bcrypt, tokenManager, func);

const authRouter = require("./routes/authRoutes");

const app = express();
app.use((req, res, next) => {
  req.authUC = authUC;

  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRouter);
app.use(serverError);

const swaggerDocument = require('./docs/docs.json');

app.use(
  '/docs',
  swaggerUi.serveFiles(swaggerDocument),
  swaggerUi.setup(swaggerDocument),
);

module.exports = app;
