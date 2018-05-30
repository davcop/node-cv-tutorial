import mongoose from 'mongoose'

const Education = new mongoose.Schema({
    scuola: { type: String, required: true},
    qualifica: { type: String, required: true},
    descrizione: { type: String, required: true},
    periodo:  { type: String, required: true},  
    votazione:  { type: String, required: true}  
})

const Docedu = mongoose.model('education', Education, 'education');

export default Docedu;
