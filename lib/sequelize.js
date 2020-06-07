const Sequelize = require("sequelize");

const categories = require("../db_defs/categories");
const devices = require("../db_defs/devices");
const deviceTypes = require("../db_defs/device_types");
const vlans = require("../db_defs/vlans");

const {
  DATABASE: database,
  DATABASE_HOST: databaseHost,
  DATABASE_USER: databaseUser,
  DATABASE_PASSWORD: databasePassword,
} = process.env;

const sequelize = new Sequelize(database, databaseUser, databasePassword, {
  host: databaseHost,
  dialect: "postgres",
});

const Categories = sequelize.define("categories", categories, {
  timestamps: false,
});
const Devices = sequelize.define("devices", devices, { timestamps: false });
const DeviceTypes = sequelize.define("device_types", deviceTypes, {
  timestamps: false,
});
const Vlans = sequelize.define("vlans", vlans, { timestamps: false });

DeviceTypes.hasMany(Devices, { foreignKey: "type" });
Devices.belongsTo(DeviceTypes, { foreignKey: "type" });

Categories.hasMany(Devices, { foreignKey: "category" });
Devices.belongsTo(Categories, {
  foreignKey: "category",
  as: "device_category",
});

Vlans.hasMany(Devices, { foreignKey: "id" });
Devices.belongsTo(Vlans, { foreignKey: "id" });

exports.Categories = Categories;
exports.Devices = Devices;
exports.DeviceTypes = DeviceTypes;
exports.Vlans = Vlans;
