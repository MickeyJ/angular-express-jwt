'use strict';
const bcrypt = require('bcrypt');


exports.seed = function(knex, Promise) {
   
  const password = bcrypt.hashSync('asdf', 10);
      
  return Promise.join (
    knex('user').del(),
    knex('user')
      .insert({
        username: 'bob',
        email: 'bob@mail.com',
        password: password
      })
      .then(function(){
        process.exit(0);
      })
  )
};


