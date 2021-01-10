const path = require('path');

const express = require('express');

const router = express.Router();

const serviceController = require('../controllers/service');

router.get('/services', serviceController.getServicePage);

router.post('/services', serviceController.getServicePage);

module.exports = router;