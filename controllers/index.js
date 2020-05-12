const express = require('express');
const app = express();

app.use(require('../controllers/usuario'));
app.use(require('../controllers/rubro'));
app.use(require('../controllers/region'))


module.exports = app;