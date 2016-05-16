
exports.post = function(req, res, next){
  const newPost = req.body.newPost;
  
  if(!newPost){
    res.status(422).send({ error: 'Must Provide the Stuff' });
  }
  else if(!newPost.title){
    res.status(422).send({ error: 'Provide Title' });
  }
  else if(!newPost.image){
    res.status(422).send({ error: 'Provide Image' });
  }
  else if(!newPost.description){
    res.status(422).send({ error: 'Provide Description' });
  }
  else
    next();
};