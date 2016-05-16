
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', table =>{
    table.increments('comment_id');
    table.string('text');
    table.string('date');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment');
};
