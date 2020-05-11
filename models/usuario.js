const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;
// Usuario Esquema

let usuarioSchema = new Schema({
    usu_nom: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    usu_email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario'],
    },
    usu_pass: {
        type: String,
        required: true
    },
    usu_alias: {
        type: String,
        required: false,
    },
    usu_img: {
        type: String,
        required: false
    },
    usu_rol: {
        type: String,
        default: "USER_ROLE",
        enum: rolesValidos
    },
    usu_est: {
        type: Boolean,
        default: true
    },
    usu_goo: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.usu_pass;

    return userObject;
}
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' })

module.exports = mongoose.model('Usuario', usuarioSchema)
