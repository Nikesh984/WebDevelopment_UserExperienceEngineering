const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./api/Routes/router');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/UserDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Use the routes defined in the router module
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
