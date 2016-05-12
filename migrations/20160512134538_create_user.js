
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', table =>{
    table.increments('user_id');
    table.string('username');
    table.string('email');
    table.string('password');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
