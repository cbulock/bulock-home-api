const express = require("express");
var cors = require('cors')
const app = express();

const PORT = 2000;

const devicesRouter = require('./routes/devices');

app.use(cors())
app.use(express.json());

app.use('/devices', devicesRouter);

app.listen(PORT, () => {
 console.log(`API server running on port ${PORT}`);
});