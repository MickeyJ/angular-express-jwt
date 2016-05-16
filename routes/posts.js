'use strict';
const express = require('express');
const router = express.Router();
const valid = require('../valid/post_valid');
const db = require('../db');
const knex = require('knex');

router.get('/', (req, res, next) => {
  db.UserPost()
  .innerJoin('user', 'user_post.user_id', 'user.user_id')
  .innerJoin('post', 'user_post.post_id', 'post.post_id')
  .then( posts => {
    db.PostComment()
    .innerJoin('comment', 'post_comment.comment_id', 'comment.comment_id')
    .then( comments => {
      posts.map( post => {
        delete post.password;
        delete post.email;
        delete post.created_at;
        delete post.updated_at;
        post.comments = comments.filter( comment =>
          post.post_id === comment.post_id
        )
      });
      res.json({posts});
    })
  });
});

router.get('/:post_id', (req, res, next) =>{
  const post_id = req.params.post_id;
  db.Post()
  .where({post_id})
  .first()
  .then( post => {
    db.PostComment()
    .where( {post_id} )
    .innerJoin('comment', 'post_comment.comment_id', 'comment.comment_id')
    .then( comments => {
      post.comments = comments;
      res.json( {post} );
    })
  });
});

router.post('/new', valid.post, (req, res, next) =>{
  const newPost = req.body.newPost;
  const user_id = req.body.user_id;
  db.Post()
  .insert(newPost)
  .returning('*')
  .then(post =>{
    db.UserPost()
    .insert({user_id, post_id: post[0].post_id})
    .then(response =>{
      res.json(post[0])
    });
  })
});

router.post('/remove', (req, res, next) =>{
  const user_post_id = req.body.user_post_id;
  const post_id = req.body.post_id;
  db.UserPost()
  .where({user_post_id})
  .del()
  .then(() =>{
    db.Post()
    .where({post_id})
    .del()
    .then(post =>{
      res.json(post)
    })
  });
});

router.post('/comment', (req, res, next) =>{
  const newComment = req.body.newComment;
  const post_id = req.body.post_id;
  db.Comment()
    .insert(newComment)
    .returning('*')
    .then(comment =>{
      const comment_id = comment[0].comment_id;
      db.PostComment()
        .insert({post_id, comment_id})
        .then(response =>{
          res.json({comment: comment[0], post_id})
        });
    })
});

router.post('/votes', (req, res, next) =>{
  const post_id = req.body.id;
  const upOrDown = req.body.upOrDown;
  const changeVoteVal = (
    upOrDown === 'up' ? 'votes + 1' : 'votes - 1'
  );
  db.Post()
  .where( {post_id} ).first()
  .update('votes', knex.raw(changeVoteVal))
  .returning('*')
  .then( votes => {
    res.json(votes[0])
  })
  .catch( err => {
    res.send( {err} )
  });
});

module.exports = router;