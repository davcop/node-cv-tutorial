import express from 'express'
import path from 'path'
import  * as cv from '../controller/api-controller';
import jwt from 'jsonwebtoken';

const apirouter = express.Router();

apirouter.use(function(req, res, next) { 

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      if ('OPTIONS' === req.method) {
        res.send(200);
      }
      else {
        next();
      }
});

// Experience

apirouter.get('/experience', cv.showListExperience)
apirouter.get('/experience-auth', cv.showListExperience)
apirouter.get('/education/', cv.showListEducation)
apirouter.get('/education/:id/show', cv.showEducation)
apirouter.post('/auth/login/', cv.checkAuthLogin)
apirouter.post('/experience/add', cv.addExperience)
apirouter.get('/experience/:id/show', cv.showExperience)
apirouter.post('/experience/up', cv.updateExperience)
apirouter.post('/experience/delete', cv.deleteExperience)

// Autorizzazioni

apirouter.use(function(req, res, next) {
    let token = '';
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1]; // Bearer TOKEN
    }
    if (token) {
        jwt.verify(token, process.env.API_SECRET_KEY, function(err, payload) {      
          if (err) {
            return res.status(403).send({ "msg": "Autenticazione fallita per il Token" , "error": 1 });    
          } else {
            req.body.payload = payload;    
            next();
          }
        });
    
      } else {
        return res.status(403).send({ 
            "msg": "URL inesistente o Token non presenti.",
            "error": 1 
        });
    
      }
    });

apirouter.post('/experience-auth/add', cv.addExperienceAuth)
apirouter.get('/experience-auth/:id/show', cv.showExperienceAuth)
apirouter.post('/experience-auth/up', cv.updateExperienceAuth)
apirouter.post('/experience-auth/delete', cv.deleteExperienceAuth)

export {apirouter}

