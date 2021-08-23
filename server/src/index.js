/* eslint-disable linebreak-style */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./midlewares');

mongoose.connect(process.env.DATBASE_URL, {
  useNewUrlParser: true, useUnifiedTopology: true,
});

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.get('/', (req, res) => {
  res.json({
    message: 'hello world',
  });
});

app.use(middlewares.notFound);

app.use(middlewares.errorHandle);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});