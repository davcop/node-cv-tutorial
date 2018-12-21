import Docexp from '../model/experience'
import Docedu from '../model/education'

export function checkAuthLogin(req, res) {
    let idtoken = process.env.API_TOKEN;
    let expire = new Date().getTime() + 300 * 1000;

    const jwt = {
        idToken: idtoken,
        scadenza: expire
    };

    if (req.body.username == 'demo' && req.body.password == 'demo') {
        res.json(jwt);
    } else {
        res.status(401).json({
            "msg": "Credenziali errate",
            "error": 1
        })
    }

}

// Mostro la lista delle esperienze

export function showListExperience(req, res) {
    Docexp.find({}, 'mansione azienda descrizione periodo status', (err, listaexp) => {
        if (err) {
            res.status(400).json({
                "msg": err,
                "error": 1
            })
        }
        res.json(listaexp);
    })
}

// Aggiunta Experience

export function addExperienceAuth(req, res) {
    const newexp = new Docexp({
        mansione: req.body.mansione,
        azienda: req.body.azienda,
        descrizione: req.body.descrizione,
        periodo: req.body.periodo,
        status: req.body.status
    })

    if (req.body.payload) {
        if (req.body.payload['uid'] == "999") {
            newexp.save((err, exp) => {
                if (err) {
                    res.status(400).json({
                        "msg": err,
                        "error": 1
                    })
                }
                res.json(exp);
            })
        } else {
            res.status(400).json({
                "msg": "Utente non verificato. Effettua il login",
                "error": 1
            })
        }
    } else {
        res.status(400).json({
            "msg": "Accesso non autorizzato. Effettua il login",
            "error": 1
        })
    }

}


export function addExperience(req, res) {
    const newexp = new Docexp({
        mansione: req.body.mansione,
        azienda: req.body.azienda,
        descrizione: req.body.descrizione,
        periodo: req.body.periodo,
        status: req.body.status
    })

    newexp.save((err, exp) => {
        if (err) {
            res.status(400).json({
                "msg": err,
                "error": 1
            })
        }
        res.json(exp);
    })

}

// Mostro singola esperienza

export function showExperience(req, res) {
    Docexp.findOne({
        _id: req.params.id
    }, 'mansione azienda descrizione periodo status', (err, exp) => {
        if (err) {
            res.status(400).json({
                "msg": err,
                "error": 1
            })
        }
        res.json(exp);
    })

    //Docexp.find().limit().sort().select().exec()
}

export function showExperienceAuth(req, res) {

    if (req.body.payload) {
        if (req.body.payload['uid'] == "999") {
            Docexp.findOne({
                _id: req.params.id
            }, 'mansione azienda descrizione periodo status', (err, exp) => {
                if (err) {
                    res.status(400).json({
                        "msg": err,
                        "error": 1
                    })
                }
                res.json(exp);
            })
        } else {
            res.status(400).json({
                "msg": "Utente non verificato. Effettua il login",
                "error": 1
            })
        }
    } else {
        res.status(400).json({
            "msg": "Accesso non autorizzato. Effettua il login",
            "error": 1
        })
    }

}

export function updateExperience(req, res) {
    const id = req.body._id;
    const utente = {
        mansione: req.body.mansione,
        azienda: req.body.azienda,
        descrizione: req.body.descrizione,
        periodo: req.body.periodo,
        status: req.body.stato
    }
    Docexp.update({
        _id: id
    }, utente, (err, okobj) => {
        if (err) {
            res.status(400).json({
                "msg": err,
                "error": 1
            })
        }
        if (okobj['nModified']) {
            res.json(utente);
        } else {
            res.json(utente);
        }


    })
}

export function updateExperienceAuth(req, res) {
    const id = req.body._id;
    const utente = {
        mansione: req.body.mansione,
        azienda: req.body.azienda,
        descrizione: req.body.descrizione,
        periodo: req.body.periodo,
        status: req.body.stato
    }

    if (req.body.payload) {
        if (req.body.payload['uid'] == "999") {    

    Docexp.update({
        _id: id
    }, utente, (err, okobj) => {
        if (err) {
            res.status(400).json({
                "msg": err,
                "error": 1
            })
        }
        if (okobj['nModified']) {
            res.json(utente);
        } else {
            res.json(utente);
        }


    })
} else {
    res.status(400).json({
        "msg": "Utente non verificato. Effettua il login",
        "error": 1
    })
}
} else {
res.status(400).json({
    "msg": "Accesso non autorizzato. Effettua il login",
    "error": 1
})
}

}

// Cancello experienza

export function deleteExperience(req, res) {
    Docexp.remove({
        _id: req.body._id
    }, (err) => {
        if (err) {
            res.status(400).json({
                "msg": err,
                "error": 1
            })
        }
        res.json({
            "msg": "Cancellazione avvenuta con successo",
            "error": 0
        });
    })
}

export function deleteExperienceAuth(req, res) {

    if (req.body.payload) {
        if (req.body.payload['uid'] == "999") {   

    // DELETE * FROM tabella WHERE id=
    Docexp.remove({
        _id: req.body._id
    }, (err) => {
        if (err) {
            res.status(400).json({
                "msg": err,
                "error": 1
            })
        }
        res.json({
            "msg": "Cancellazione avvenuta con successo",
            "error": 0
        });
    })
} else {
    res.status(400).json({
        "msg": "Utente non verificato. Effettua il login",
        "error": 1
    })
}
} else {
res.status(400).json({
    "msg": "Accesso non autorizzato. Effettua il login",
    "error": 1
})
}

}


export function showListEducation(req, res) {
    Docedu.find({}, 'scuola qualifica descrizione periodo votazione', (err, listaedu) => {
        if (err) {
            res.status(400).json({
                "msg": err,
                "error": 1
            })
        }
        res.json(listaedu);
    })
}

export function showEducation(req, res) {
    Docedu.findOne({
        _id: req.params.id
    }, 'scuola qualifica descrizione periodo votazione', (err, exp) => {
        if (err) {
            res.status(400).json({
                "msg": err,
                "error": 1
            })
        }
        res.json(exp);
    })
}