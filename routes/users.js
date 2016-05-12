'use strict';
const express = require('express');
const router = express.Router();
const db = require('../db/tables');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const jwtSecret = 'iasdflikeasdfpizzasdf/p0o';

let currentUser = {};

router.use(expressJwt({
  secret: jwtSecret
}).unless({
  path: [
    '/users/login',
    '/users/register',
    '/users/me'
  ]
}));

router.get('/me', (req, res, next) =>{
  if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, jwtSecret);
    db.User()
    .where({user_id: payload.user_id}).first()
    .then(user =>{
      delete user.password;
      const token = jwt.sign({
        user_id: user.user_id
      }, jwtSecret);
      res.send({
        token: token,
        user: user
      });
    })
  }
});

router.post('/login', (req, res, next) =>{
  const body = req.body.user;
  if(!body){
    res.status(401).send({ error: 'Must Provide the Stuff' });
  } else {
    db.User()
    .where({email: body.email}).first()
    .then(user => {
      if(!user)
        res.status(401).send({error: 'Does not exist'});
      // else if(body.username !== user.username)
      //   res.status(401).send({error: 'Invalid Stuff'});

      else{
        currentUser = user;
        const token = jwt.sign({
          user_id: user.user_id
        }, jwtSecret);
        res.send({
          token,
          user
        });
      }
    });
  }
});


router.post('/register', authorizeRegister, (req, res, next) =>{
  const body = req.body.user;
  const hash = bcrypt.hashSync(body.password, 10);
  db.User()
    .insert({
      name: req.body.name,
      email: req.body.email,
      password: hash
    }).returning('*')
    .then((response) => {
      res.json(response);
      // const token = jwt.sign({
      //   username: user.username
      // }, jwtSecret);
      // res.send({
      //   token: token,
      //   user: currentUser
      // });
    })
    .catch(err =>{ next(new Error(err)) });

});

function authorizeRegister(req, res, next){
  if(!req.body.user){
    res.status(401).send({ error: 'Must Provide the Stuff' });
  }
  const body = req.body.user;

  if(!body.username){
    res.status(401).send({ error: 'Provide Username' });
  }
  else if(!body.email){
    res.status(401).send({ error: 'Provide Email' });
  }
  else if(body.password) {
    res.status(401).send({ error: 'Provide Password' });
  }
  else {
    next();
  }
}

module.exports = router;