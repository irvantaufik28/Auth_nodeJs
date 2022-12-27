const express = require('express');
const courierRateController = require('../controller/courierRateController.js');
const authorized = require('../middlerware/authorization');
const validator = require('../middlerware/validator')


const router = express.Router();
router.get('/courier-rate', authorized, courierRateController.getAllCourierRate);
router.get('/courier-rate-by-origin-dest', authorized, validator.getByOriginDestValidation, courierRateController.getCourierRatesByOriginDestination);
router.get('/courier-rate/:id',authorized, courierRateController.getCourierRateById);
router.post('/courier-rate/',authorized,courierRateController.createCourierRate);
router.put('/courier-rate/:id',authorized, courierRateController.updateCourierRate);
router.delete('/courier-rate/:id',authorized, courierRateController.deleteCourierRate);

module.exports = router;