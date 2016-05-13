'use strict';
require('dotenv').load();
const express = require('express');
const router = express.Router();
const db = require('../db');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// router.use(expressJwt({
//   secret: process.env.JWT_SECRET
// }).unless({
//   path: [
//     '/users/login',
//     '/users/register',
//     '/users/me'
//   ]
// }));

router.get('/me', (req, res, next) => {
  if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    db.User()
    .where({user_id: payload.user_id})
    .first()
    .then(user =>{
      delete user.password;
      res.json({
        token: token,
        user: user
      });
    })
  } else {
    res.status(401).send({ error: 'No authorized token' });
  }
});

router.post('/login', (req, res, next) =>{
  const body = req.body.user;
  if(!body || !body.email || !body.password){
    res.status(401).send({ error: 'Both fields are required' });
  } else {
    db.User()
    .whereRaw('lower(email) = ?', body.email.toLowerCase())
    .first()
    .then(user => {
      if(!user) {
        res.status(401).send({ error: 'Invalid email' });
      }
      else if(!bcrypt.compareSync(body.password, user.password)) {
        res.status(401).send({ error: 'Invalid password' });
      }
      else {
        delete user.password;
        const token = jwt.sign({
          user_id: user.user_id
        }, process.env.JWT_SECRET);
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
    username: body.username,
    email: body.email,
    password: hash
  })
  .returning('*')
  .then(user => {
    delete user.password;
    const token = jwt.sign({
      user_id: user[0].user_id
    }, process.env.JWT_SECRET);
    res.send({
      token,
      user: user[0]
    });
  })
});

function authorizeRegister(req, res, next){
  const body = req.body.user;
  if(!body)
    res.status(401).send({ error: 'Must Provide the Stuff' });

  else if(!body.username)
    res.status(401).send({ error: 'Provide Username' });

  else if(!body.email)
    res.status(401).send({ error: 'Provide Email' });

  else if(!body.password)
    res.status(401).send({ error: 'Provide Password' });

  else
    next();
}

module.exports = router;