// import express from 'express'
// import path from 'path'

import Docexp from '../model/experience'
import Docedu from '../model/education'

// Mostro la lista delle esperienze

export function showListExperience(req,res) {
    //SELECT titolo, descrizione FROM experience
    Docexp.find({}, 'mansione azienda descrizione periodo status', (err,listaexp)=>{
        if(err) {
            res.status(400).json({"msg": err, "error": 1})
        }
        res.json(listaexp);
    })
}

// Aggiunta Experience

export function addExperience(req,res) {
const newexp = new Docexp({
    mansione: req.body.mansione,
    azienda: req.body.azienda,
    descrizione: req.body.descrizione,
    periodo: req.body.periodo,
    status : req.body.status
})

newexp.save((err,exp)=>{
    if (err) {
        res.status(400).json({"msg": err, "error": 1})
    }
    res.json(exp);
})

}

// Mostro singola esperienza

export function showExperience(req,res) {
     //SELECT titolo, descrizione FROM experience WHERE id=923834784
    Docexp.findOne({_id: req.params.id}, 'mansione azienda descrizione periodo status', (err,exp)=>{
        if(err) {
            res.status(400).json({"msg": err, "error": 1})
        }
        res.json(exp);
    })

    //Docexp.find().limit().sort().select().exec()
}
export function updateExperience(req,res) {
    // UPDATE tabella SET col=valore WHERE _id=
    const id = req.body._id;
    const utente = {
      mansione: req.body.mansione,
      azienda: req.body.azienda,
      descrizione: req.body.descrizione,
      periodo: req.body.periodo,
      status: req.body.stato
    }
    Docexp.update({_id: id}, utente, (err,okobj)=>{
      if(err) {
          res.status(400).json({"msg": err, "error": 1})
      }
      if(okobj['nModified']) {
        res.json(utente);
      } else {
        res.json(utente);  
      }
      
      
    })
  }

// Cancello experienza

export function deleteExperience(req,res) {
    // DELETE * FROM tabella WHERE id=
      Docexp.remove({_id: req.params.id}, (err)=>{
        if(err) {
            res.status(400).json({"error": err})
        }
        res.json({"msg":"Cancellazione avvenuta con successo", "error": 0});
    })
}


export function showListEducation(req,res) {
    //SELECT titolo, descrizione FROM experience
    Docedu.find({}, 'scuola qualifica descrizione periodo votazione', (err,listaedu)=>{
        if(err) {
            res.status(400).json({"msg": err, "error": 1})
        }
        res.json(listaedu);
    })
}
