const express = require('express');
const router = express.Router();
const sequelize = require('../lib/sequelize');

const { Devices, DeviceTypes } = sequelize;

router.get('/', function(req, res, next) {
	Devices.findAll().then(devices => {
		res.json(devices);
	});
});

router.put('/', function(req, res, next) {
	Devices.create(req.body).then(devices => {
		res.json(req.body);
	});
});

router.get('/types', function(req, res, next) {
	DeviceTypes.findAll().then(types => {
		res.json(types);
	});
});

module.exports = router;