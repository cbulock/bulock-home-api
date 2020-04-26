const Sequelize = require('sequelize');
const config = require('./config');

const categories = require('../db_defs/categories');
const devices = require('../db_defs/devices');
const deviceTypes = require('../db_defs/device_types');

const { database, databaseHost, databaseUser, databasePassword } = config;

const sequelize = new Sequelize(database, databaseUser, databasePassword, {
	host: databaseHost,
	dialect: 'postgres'
});

const Categories = sequelize.define('categories', categories, {timestamps: false});
const Devices = sequelize.define('devices', devices, {timestamps: false});
const DeviceTypes = sequelize.define('device_types', deviceTypes, {timestamps: false});

exports.Categories = Categories;
exports.Devices = Devices;
exports.DeviceTypes = DeviceTypes;