const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const startConsumer = require("./kafkaConsumer.js");

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use('/properties', routes);

startConsumer();

app.listen(PORT, () => {
  console.log(`User service is running on http://localhost:${PORT}`);
});
