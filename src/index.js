import express from 'express'
import path from 'path'
import { apirouter } from './routers/api-router'
import bodyParser from 'body-Parser'
import mongoose from 'mongoose'

const port = process.env.PORT || 80;
const dburl = process.env.MONGODB_URI || 'mongodb://davcop:123456789@ds219130.mlab.com:19130/mycurriculum';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apirouter)

mongoose.connect(dburl).then(
 () => {console.log('Ok connessione al db effettuata')},
 (err) => {console.log('Errore di connessione al database')}
)

app.listen(port, () => {
    console.log('Applicazione in ascolto')
})