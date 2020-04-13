const express = require("express");
const router = express.Router();
const sequelize = require("../lib/sequelize");
const oui = require('oui');

const { Devices, DeviceTypes } = sequelize;

router.get("/", function (req, res, next) {
	Devices.findAll().then((devices) => {
		DeviceTypes.findAll().then((types) => {
			devices.forEach(device => {
				// Update types
				const type = types.find(t => t.value === device.type );
				device.type = type;
				// Update MAC
				const mac = device.mac
				let ouiData = oui(mac)
				if (ouiData) ouiData = ouiData.split('\n')[0];
				device.mac = {
					value: mac,
					oui: ouiData,
				};

				return device;
			});
			res.json(devices);
		});
	});
});

router.put("/", function (req, res, next) {
	Devices.create(req.body).then((devices) => {
		res.json(req.body);
	});
});

router.patch("/", function (req, res, next) {
	Devices.update(req.body, { where: { id: req.body.id } }).then((devices) => {
		res.json(req.body);
	});
});

router.get("/types", function (req, res, next) {
	DeviceTypes.findAll().then((types) => {
		res.json(types);
	});
});

module.exports = router;
