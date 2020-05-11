const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let rubroSchema = new Schema({
    ru_nom: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Rubro', rubroSchema)