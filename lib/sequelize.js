const Sequelize = require('sequelize');
const config = require('./config');

const { database, databaseHost, databaseUser, databasePassword } = config;

const sequelize = new Sequelize(database, databaseUser, databasePassword, {
	host: databaseHost,
	dialect: 'postgres'
});

const DeviceTypes = sequelize.define('device_types', {
	value: {
		type: Sequelize.STRING,
		primaryKey: true,
		allowNull: false
	},
	display_name: {
		type: Sequelize.STRING,
		allowNull: false
	},
},{
	timestamps: false
});

const Devices = sequelize.define('devices', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	type: {
		type: Sequelize.STRING,
		allowNull: false,
		references: {
			model: 'device_types', 
			key: 'value',
	 }
	},
	ip: {
		type: Sequelize.INET
	},
	mac: {
		type: Sequelize.MACADDR
	},
	hostname: {
		type: Sequelize.STRING
	}
},{
	timestamps: false
});

exports.Devices = Devices;
exports.DeviceTypes = DeviceTypes;