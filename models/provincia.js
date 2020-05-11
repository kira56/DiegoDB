const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let provinciaSchema = new Schema({
    pro_nom: {
        type: String,
        default: 'AREQUIPA',
        required: false,
    }
});

module.exports = mongoose.model('Provincia',provinciaSchema);
