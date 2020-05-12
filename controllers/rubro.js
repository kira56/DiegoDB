const express = require('express');
const app = express();

const Rubro = require('../models/rubro');

app.get('/rubro', (req, res) => {
    Rubro.find({})
        .exec((err,rubros)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                })
            }
            return res.status(200).json({
                ok:true,
                rubro:rubros
            })
        })
})

app.post('/rubro', (req, res) => {
    let body = req.body;

    let rubro = new Rubro({
        ru_nom: body.ru_nom
    });
    rubro.save((err, rubroDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        };
        return res.status(200).json({
            ok: true,
            rubro: rubroDB
        })
    })
})


module.exports = app;