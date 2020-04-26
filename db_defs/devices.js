const Sequelize = require('sequelize');

module.exports = {
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
	},
	category: {
		type: Sequelize.INTEGER,
		references: {
			model: 'categories', 
			key: 'id',
	 }
	},

};