/* eslint-disable linebreak-style */
/* eslint-disable no-multiple-empty-lines */
const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl})`);
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandle = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandle,
};

