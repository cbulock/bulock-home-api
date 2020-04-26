const Sequelize = require('sequelize');

module.exports = {
	value: {
		type: Sequelize.STRING,
		primaryKey: true,
		allowNull: false
	},
	display_name: {
		type: Sequelize.STRING,
		allowNull: false
	},
};