import express from 'express'
import path from 'path'
import  * as cv from '../controller/api-controller';
import jwt from 'jsonwebtoken';

const apirouter = express.Router();

// modifiche per JSON web Token
// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens#authenticating-and-creating-a-token
// 1) npm install jsonwebtoken --save
// 2) import jwt from 'jsonwebtoken';


// Modifiche per CORS
// https://gist.github.com/cuppster/2344435
apirouter.use(function(req, res, next) { 
  // non può essere * quando si inviano le credenziali con Authorization
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      //intercepts OPTIONS method
      if ('OPTIONS' === req.method) {
        //respond with 200
        // Il valore predefinito della risposta è OK quindi potresti usare o 204 come codice "No content" 
        // oppure res.send(200).('')
        res.send(200);
      }
      else {
      //move on
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
// Inserendole in questo punto, prima della definizione delle altre route,
// tutte sono protette. E' uno dei tanti modi per proteggere delle route
// in Node usando Express.

apirouter.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    //var token = req.body.token || req.query.token || req.headers['x-access-token'];
    let token = '';
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1]; // Bearer TOKEN
    }
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, '123456789', function(err, payload) {      
          if (err) {
            return res.status(403).send({ "msg": "Autenticazione fallita per il Token" , "error": 1 });    
          } else {
            // if everything is good, save to request for use in other routes
            req.body.payload = payload;    
            next();
          }
        });
    
      } else {
    
        // if there is no token
        // return an error
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

