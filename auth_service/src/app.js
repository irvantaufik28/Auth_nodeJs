require('dotenv').config();

const express = require('express');
const cors = require('cors')
const serverError = require('./middlerware/serverError')
     

const app = express();

app.use((req, res, next) => {

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