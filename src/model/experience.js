import mongoose from 'mongoose'

const Experience = new mongoose.Schema({
    mansione: { type: String, required: true},
    azienda: { type: String, required: true},
    descrizione: { type: String, required: true},
    periodo:  { type: String, required: true}  
})

const Docexp = mongoose.model('experience', Experience, 'experience');

export default Docexp;
