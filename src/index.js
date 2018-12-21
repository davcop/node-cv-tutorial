import express from 'express'
import { apirouter } from './routers/api-router'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const port = process.env.PORT || 80;
const dburl = process.env.MONGODB_URI || process.env.MONGO_DB_STRING_CONNECTION;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apirouter)

mongoose.connect(dburl).then(
 () => {console.log('Ok connessione al db effettuata')},
 (err) => {console.log('Errore di connessione al database')}
)

app.listen(port, () => {
    console.log('Applicazione in ascolto');
})