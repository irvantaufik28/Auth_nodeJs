require('dotenv').config();

const express = require('express');
const cors = require('cors')
const serverError = require('./middlerware/serverError')
const bcrypt = require('bcrypt');
const tokenManager = require('./helper/tokenManager')
     

const UserRepository = require('./repository/userRepository')
const AuthUseCase = require('./usecase/authUseCase')

const AuthUC = new UserRepository(new AuthUseCase(), bcrypt, tokenManager)


const app = express();
app.use((req, res, next) => {
    req.AuthUC = AuthUC;

  next();
});



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res)=> {
    res.json('auth service')
})

app.use(serverError);



module.exports = app;