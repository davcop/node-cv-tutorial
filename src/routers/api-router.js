import express from 'express'
import path from 'path'
import  * as cv from '../controller/api-controller';

const apirouter = express.Router();

// Experience

apirouter.get('/experience', cv.showListExperience)
apirouter.post('/experience/add', cv.addExperience)
apirouter.get('/experience/:id/show', cv.showExperience)
apirouter.post('/experience/up', cv.updateExperience)
apirouter.get('/experience/:id/delete', cv.deleteExperience)

export {apirouter}

