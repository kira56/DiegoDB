require('../config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Controladores
app.use(require('../controllers/index'));

mongoose.connect('mongodb://localhost:27017/diegoDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log('Base de datos online')
})

app.listen(process.env.PORT, () => {
    console.log(('Puerto en funcionamiento'), 3000)
})