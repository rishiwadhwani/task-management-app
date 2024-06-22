const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');
const loginRoutes = require('./routes/login');

require('dotenv').config();
var cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())

app.use(bodyParser.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/login', loginRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
