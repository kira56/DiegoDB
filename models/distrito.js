const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let distritoSchema = new Schema({
    dist_nom: {
        type: String,
        required: false,
        default: 'AREQUIPA',
    }
});

module.exports = mongoose.model('Distrito',distritoSchema)
