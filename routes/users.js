'use strict';
const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const jwtSecret = 'iasdflikeasdfpizzasdf/p0o';

const users = [
  { id: 1, username: "Bob", email: "b@b.com", password: "asdf", avatar: 'images/aspen-forest.jpg' },
  { id: 2, username: "Suzy", email: 'suzy@mail.com', password: "zxcv", avatar: 'images/aspen-forest.jpg' }
];

let currentUser = {};

router.use(expressJwt({ 
  secret: jwtSecret 
}).unless({
  path: ['/users/login']
}));

router.get('/', (req, res, next) =>{
  const token = jwt.sign({
    username: currentUser.username
  }, jwtSecret);
  res.send({
    token: token,
    user: currentUser
  });
});

router.post('/login', authorizeLogin, (req, res, next) =>{
  const token = jwt.sign({
    username: currentUser.username
  }, jwtSecret);
  res.send({
    token: token,
    user: currentUser
  });
});

function authorizeLogin(req, res, next){
  const body = req.body.user;
  const user = users.filter( x => x.email == req.body.user.email)[0];
  currentUser = user;

  if(!body.username || !body.password){
    res.send({err: 'must provide stuff'})
  } 
  else if(body.username !== user.username || body.password !== user.password) {
    res.send({err: 'wrong stuff'})
  } 
  else {
    next();
  }
}

router.post('/register', (req, res, next) =>{
  req.body.user['id'] = getNewId(users);
  users.push(req.body.user);
  res.json(req.body)
});

function getNewId(users){
  return users.reduce((max, x) =>
      Math.max(x.id, max), -1) +1
}

module.exports = router;