const express = require("express");
var cors = require('cors')
const app = express();
const config = require('./config');

const devicesRouter = require('./routes/devices');
const utilsRouter = require('./routes/utils');

app.use(cors())
app.use(express.json());

app.use('/devices', devicesRouter);
app.use('/utils', utilsRouter);

app.listen(config.port, () => {
 console.log(`API server running on port ${config.port}`);
});