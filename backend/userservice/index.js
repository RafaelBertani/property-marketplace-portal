const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/users', routes);

app.listen(PORT, () => {
  console.log(`User service is running on http://localhost:${PORT}`);
});
