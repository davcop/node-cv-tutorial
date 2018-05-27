// import express from 'express'
// import path from 'path'

import Docexp from '../model/experience'

// Mostro la lista delle esperienze

export function showListExperience(req,res) {
    //SELECT titolo, descrizione FROM experience
    Docexp.find({}, 'mansione azienda descrizione periodo status', (err,listaexp)=>{
        if(err) {
            res.status(400).json({"error": err})
        }
        res.json(listaexp);
    })
}

// Aggiunta Experience

export function addExperience(req,res) {
const newexp = new Docexp({
    titolo: req.body.titolo,
    azienda: req.body.azienda,
    descrizione: req.body.descrizione,
    periodo: req.body.periodo
})

newexp.save((err,exp)=>{
    if (err) {
        res.status(400).json({"error":err})
    }
    res.json(exp);
})

}

// Mostro singola esperienza

export function showExperience(req,res) {
     //SELECT titolo, descrizione FROM experience WHERE id=923834784
    Docexp.findOne({_id: req.params.id}, 'titolo descrizione', (err,exp)=>{
        if(err) {
            res.status(400).json({"msg": err, "error": 1})
        }
        res.json(exp);
    })

    //Docexp.find().limit().sort().select().exec()
}
export function updateExperience(req,res) {

}

// Cancello experienza

export function deleteExperience(req,res) {
    // DELETE * FROM tabella WHERE id=
      Docexp.remove({_id: req.params.id}, (err)=>{
        if(err) {
            res.status(400).json({"error": err})
        }
        res.json({"msg":"Cancellazione avvenuta con successo", "error": 1});
    })
}
