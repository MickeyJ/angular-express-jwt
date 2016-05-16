exports.up = function(knex, Promise) {
  return knex.schema.createTable('post_comment', table =>{
    table.increments('post_comment_id');
    table.integer('post_id').unsigned().references('post_id').inTable('post');
    table.integer('comment_id').unsigned().references('comment_id').inTable('comment');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post_comment');
};