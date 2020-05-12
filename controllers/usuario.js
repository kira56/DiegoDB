const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario')
const app = express();

app.get('/usuario', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite)
    Usuario.find({ usu_est: true }, 'usu_nom usu_email usu_est usu_rol usu_img usu_goo')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            };
            Usuario.countDocuments({ usu_est: true }, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            })
        })
})

app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        usu_nom: body.usu_nom,
        usu_email: body.usu_email,
        usu_pass: bcrypt.hashSync(body.usu_pass, 10),
        usu_rol: body.usu_rol
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        })
    })
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['usu_nom', 'usu_email', 'usu_rol', 'usu_est', 'usu_alias', 'usu_img']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        return res.status(200).json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.delete('/usuario/:id', (req, res) => {
    // Recordar que en una DB jamas se eliminan los datos , simplemente cambian de estado
    let id = req.params.id;
    let cambiaEstado = {
        usu_est: false
    }
    Usuario.findByIdAndUpdate(id, cambiaEstado, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        };
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        };
        return res.status(200).json({
            ok: true,
            message: 'Usuario Borrado',
            usuario: usuarioBorrado
        })
    })
})
module.exports = app;