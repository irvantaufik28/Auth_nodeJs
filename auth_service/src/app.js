require('dotenv').config();

const express = require('express');
const cors = require('cors')
const serverError = require('./middlerware/serverError')
const bcrypt = require('bcrypt');
const tokenManager = require('./helper/tokenManger')
     

const UserRepository = require('./repository/userRepository')
const AuthUseCase = require('./usecase/authUseCase')

const authUC = new AuthUseCase(new UserRepository(), bcrypt, tokenManager)

const authRouter = require('./routes/authRoutes')

const app = express();
app.use((req, res, next) => {
    req.authUC = authUC;

  next();
});



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res)=> {
    res.json('auth service')
})
app.use('/', authRouter)
app.use(serverError);



module.exports = app;