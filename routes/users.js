'use strict';
require('dotenv').load();
const express = require('express');
const router = express.Router();
const auth = require('../valid/user_auth');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');

router.use(expressJwt({
  secret: process.env.JWT_SECRET
}).unless({
  path: [
    '/users/login',
    '/users/register',
    '/users/me'
  ]
}));

router.get('/me', (req, res, next) => {
  if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    db.User()
    .where({user_id: payload.user_id})
    .first()
    .then(user =>{
      delete user.password;
      res.json({token, user});
    })
  } else {
    res.status(401).send({ error: 'No authorized token' });
  }
});

router.post('/login', auth.login, (req, res, next) =>{
  const body = req.body.user;
  db.User()
  .whereRaw('lower(email) = ?', body.email.toLowerCase())
  .first()
  .then(user => {
    if(!user) {
      res.status(422).send({ error: 'Invalid email' });
    } else if(!bcrypt.compareSync(body.password, user.password)) {
      res.status(422).send({ error: 'Invalid password' });
    } else {
      const user_id = user.user_id;
      const token = jwt.sign({user_id}, process.env.JWT_SECRET);
      delete user.password;
      res.json({token, user});
    }
  });
});

router.post('/register', auth.register, (req, res, next) =>{
  const username = req.body.user.username;
  const email = req.body.user.email;
  const password = bcrypt.hashSync(req.body.user.password, 10);
  db.User()
  .insert({ username, email, password })
  .returning('*')
  .then(returned => {
    const user = returned[0];
    const user_id = user.user_id;
    const token = jwt.sign({user_id}, process.env.JWT_SECRET);
    delete user.password;
    res.send({token, user});
  })
});

module.exports = router;