const express = require("express");
const router = express.Router();
const sequelize = require("../lib/sequelize");
const oui = require("oui");

router.get("/oui/:mac", function (req, res, next) {
	const { mac } = req.params;
	let results = {};
	const ouiData = oui(mac);
	if (ouiData) {
		results = {
			company: ouiData.split("\n")[0],
			fullData: ouiData,
		};
	}
	res.json(results);
});

module.exports = router;
