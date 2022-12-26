const express = require('express');
const logisticController = require('../controller/logisticController');

const router = express.Router();
router.get('/logistic', logisticController.getAllLogistc);
router.get('/logistic/:id', logisticController.getLogisticById);
router.post('/logistic',logisticController.createLogistic);
router.put('/logistic/:id', logisticController.updateLogistic);
router.delete('/logistic/:id', logisticController.deleteLogistic);

module.exports = router;