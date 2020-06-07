const Sequelize = require('sequelize');

module.exports = {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	subnet: {
		type: Sequelize.CIDR,
		field: 'subnet'
	},
};