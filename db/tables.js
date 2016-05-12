var knex = require('./knex');

exports.User = () => knex('user');
exports.Post = () => knex('post');
exports.UserPost = () => knex('user_post');
