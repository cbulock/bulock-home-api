const express = require("express");
var cors = require('cors')
const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const devicesRouter = require('./routes/devices');
const utilsRouter = require('./routes/utils');

const port = process.env.PORT;

app.use(cors())
app.use(express.json());

app.use('/devices', devicesRouter);
app.use('/utils', utilsRouter);

app.listen(port, () => {
 console.log(`API server running on port ${port}`);
});