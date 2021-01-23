const express = require('express');
const error = require('../middleware/error');
const auth = require('../routes/auth');
const users = require('../routes/users');
const customers = require('../routes/customers');
const herbs = require('../routes/herbs');
const herbsBG = require('../routes/herbsBG');
const oils = require('../routes/oils');
const oilsBG = require('../routes/oilsBG');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/auth', auth);
  app.use('/api/users', users);
  app.use('/api/customers', customers);
  app.use('/api/herbs', herbs);
  app.use('/api/herbsBG', herbsBG);
  app.use('/api/oils', oils);
  app.use('/api/oilsBG', oilsBG);
  app.use(error);
}