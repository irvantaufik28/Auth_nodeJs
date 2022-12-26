const express = require('express');
const logisticController = require('../controller/logisticController');
const authorized = require('../middlerware/authorization');

const router = express.Router();
router.get('/logistic', authorized, logisticController.getAllLogistc);
router.get('/logistic/:id',authorized, logisticController.getLogisticById);
router.post('/logistic',authorized,logisticController.createLogistic);
router.put('/logistic/:id',authorized, logisticController.updateLogistic);
router.delete('/logistic/:id',authorized, logisticController.deleteLogistic);

module.exports = router;