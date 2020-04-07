const Sequelize = require('sequelize');
const config = require('./config');

const { database, databaseUser, databasePassword } = config;

const sequelize = new Sequelize(database, databaseUser, databasePassword, {
	host: 'ha.docker',
	dialect: 'postgres'
});

const Devices = sequelize.define('devices', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	type: {
		type: Sequelize.STRING,
		allowNull: false
	},
	ip: {
		type: Sequelize.INET
	},
	mac: {
		type: Sequelize.MACADDR
	}
},{
	timestamps: false
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

exports.Devices = Devices;
exports.DeviceTypes = DeviceTypes;