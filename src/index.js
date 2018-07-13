import express from 'express'
import path from 'path'
import { apirouter } from './routers/api-router'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const port = process.env.PORT || 80;
const dburl = process.env.MONGODB_URI || 'mongodb://davcop:123456789@ds219130.mlab.com:19130/mycurriculum';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// aggiungo autorizzazione per bypassare CORS
//

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api', apirouter)

mongoose.connect(dburl).then(
 () => {console.log('Ok connessione al db effettuata')},
 (err) => {console.log('Errore di connessione al database')}
)

app.listen(port, () => {
    console.log('Applicazione in ascolto')
})