const express = require("express");
const router = express.Router();
const sequelize = require("../lib/sequelize");
const oui = require('oui');
const dnsConfig = require('dns-config');
const Hosts = require('hosts-parser').Hosts;

const hosts = new Hosts(dnsConfig);

const { Categories, Devices, DeviceTypes } = sequelize;

router.get("/", function (req, res, next) {
	Devices.findAll().then((devices) => {
		Categories.findAll().then((categories) => {
			DeviceTypes.findAll().then((types) => {
				devices.forEach(device => {
					// Check if hostnames are set to resolve properly
					if (device.hostname) {
						device.setDataValue('hostnameValid', hosts.resolve(device.hostname) === device.ip);
					}
					// Update categories
					const category = categories.find(category => category.id === device.category ) || { id: null, name: '' };
					device.category = category;
					// Update types
					const type = types.find(t => t.value === device.type );
					device.type = type;
					// Add OUI info
					let ouiData = oui(device.mac)
					if (ouiData) ouiData = ouiData.split('\n')[0];
					device.setDataValue('oui', ouiData);
					return device;
				});
				res.json(devices);
			});
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

router.get("/categories", function (req, res, next) {
	Categories.findAll().then((categories) => {
		res.json(categories);
	});
});

router.get("/types", function (req, res, next) {
	DeviceTypes.findAll().then((types) => {
		res.json(types);
	});
});

module.exports = router;
