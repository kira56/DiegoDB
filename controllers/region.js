const express = require('express');
const app = express()

const Region = require('../models/region');

app.get('/region', (req, res) => {
    Region.find({})
        .exec((err, regiones) => {
            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                })
            }
            return res.status(200).json({
                ok:true,
                region:regiones
            })
        })
});
app.post('/region', (req, res) => {
    let body = req.body;

    let region = new Region({
        reg_nom: body.reg_nom
    });
    region.save((err, regionDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.status(200).json({
            ok: true,
            region: regionDB
        })
    })
})
module.exports = app;
