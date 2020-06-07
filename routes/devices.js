const express = require("express");
const router = express.Router();
const axios = require('axios');
const sequelize = require("../lib/sequelize");
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const oui = require("oui");
const dnsConfig = require("dns-config");
const Hosts = require("hosts-parser").Hosts;

const hosts = new Hosts(dnsConfig);

const nagiosHost = process.env.NAGIOS_HOST;

const { Categories, Devices, DeviceTypes, Vlans } = sequelize;

router.get("/", function (req, res, next) {
	Devices.findAll({
		include: [
			{
				model: DeviceTypes,
				required: true,
			},
			{
				model: Categories,
				as: "device_category",
				required: true,
			},
			{
				model: Vlans,
				required: false,
				on: {
					'$devices.ip$': { [Op.strictLeft]: Sequelize.col('vlan.subnet') }
				},
			},
		],
	}).then((devices) => {
		devices.forEach((device) => {
			// Check host online status
			/* TODO: going to need a background process to retrieve this data
			if (device.hostname) {
				const nagiosUrl = `${nagiosHost}/nagios/cgi-bin/statusjson.cgi?query=host&formatoptions=enumerate&hostname=${device.hostname}`;
				const response = await axios.get(nagiosUrl);
				device.setDataValue(
					"hostStatus",
					response.data.data.host?.status
				);
			}
			*/
			// Check if hostnames are set to resolve properly
			if (device.hostname) {
				device.setDataValue(
					"hostnameValid",
					hosts.resolve(device.hostname) === device.ip
				);
			}
			// Add OUI info
			let ouiData = oui(device.mac);
			if (ouiData) ouiData = ouiData.split("\n")[0];
			device.setDataValue("oui", ouiData);

			return device;
		});
		res.json(devices);
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
