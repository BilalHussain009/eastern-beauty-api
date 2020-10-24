const express = require('express');
const error = require('../middleware/error');
const auth = require('../routes/auth');
const users = require('../routes/users');
const customers = require('../routes/customers');
const herbs = require('../routes/herbs');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/auth', auth);
  app.use('/api/users', users);
  app.use('/api/customers', customers);
  app.use('/api/herbs', herbs);
  app.use(error);
}