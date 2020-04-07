var fs = require("fs");
var configFile = fs.readFileSync("./config.json");
var config = JSON.parse(configFile);

module.exports = config;