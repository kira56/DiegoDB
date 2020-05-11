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
    Usuario.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            };
            Usuario.countDocuments((err, conteo) => {
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
})

module.exports = app;