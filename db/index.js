var knex = require('./knex');

exports.User = () => knex('user');
exports.Post = () => knex('post');
exports.Comment = () => knex('comment');
exports.PostComment = () => knex('post_comment');
exports.UserPost = () => knex('user_post');
