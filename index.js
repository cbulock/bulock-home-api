const express = require("express");
var cors = require('cors')
const app = express();
const config = require('./config');

const devicesRouter = require('./routes/devices');

app.use(cors())
app.use(express.json());

app.use('/devices', devicesRouter);

app.listen(config.port, () => {
 console.log(`API server running on port ${config.port}`);
});