const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let regionSchema = new Schema({
    reg_nom: {
        type: String,
        required: false,
        default: 'AREQUIPA'
    }
})

module.exports = mongoose.model('Region', regionSchema)
