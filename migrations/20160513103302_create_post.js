
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post', table =>{
    table.increments('post_id');
    table.string('title');
    table.string('image');
    table.string('description');
    table.string('date');
    table.integer('votes')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post');
};
