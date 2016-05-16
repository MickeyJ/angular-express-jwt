exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_post', table =>{
    table.increments('user_post_id');
    table.integer('user_id').unsigned().references('user_id').inTable('user');
    table.integer('post_id').unsigned().references('post_id').inTable('post');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_post');
};