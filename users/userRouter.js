const express = require('express');
const userDb = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.post('/', validateUser,(req, res) => {
  // do your magic!
  userDb.insert(req.body).then(nUser=>{
    res.status(201).json(nUser);
  }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"Error adding user."});
  })
});

router.post('/:id/posts', validateUserId, validatePost,(req, res) => {
  // do your magic!
  postDb.insert({...req.body,user_id:req.params.id}).then(nPost=>{
    res.status(201).json(nPost);
  }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"Error adding post."});
  })
});

router.get('/', (req, res) => {
  // do your magic!
  userDb.get().then(users=>{
    res.status(201).json(users);
  }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"Error retrieving users."});
  })
});

router.get('/:id', validateUserId,(req, res) => {
  // do your magic!
  userDb.getById(req.params.id).then(users=>{
    res.status(201).json(users);
  }).catch((err)=>{
    console.log(err);
    res.status(500).json({message:"Error retrieving data"});
  })
});

router.get('/:id/posts', validateUserId,(req, res) => {
  // do your magic!
  userDb.getUserPosts(req.params.id).then(posts=>{
    res.status(201).json(posts)
  }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"Error while getting the user's posts"});
  })
});

router.delete('/:id', validateUserId,(req, res) => {
  // do your magic!
  userDb.remove(req.params.id).then(count=>{
    res.status(201).json({message:"User deleted succesfully"})
  }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"Couldn't delete user"});
  })
});

router.put('/:id', validateUserId,(req, res) => {
  // do your magic!
  userDb.update(req.params.id,{name:req.body.name}).then(count=>{
    res.status(201).json({message:"User updated succesfully"})
  }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"Couldn't update user"});
  })
});

//custom middleware
function validateUserId(req, res, next) {
  userDb.getById(req.params.id).then(user=>{
    user?next():res.status(400).json({ message: "invalid user id" });
  })
  // do your magic!
}

function validateUser(req, res, next) {
  if(!req.body){
    res.status(400).json({message:"missing user data"});
  }
  if(!req.body.name){
    res.status(400).json({ message: "missing required name field" });
  }
  next();
  // do your magic!
}

function validatePost(req, res, next) {
  if(!req.body){
    res.status(400).json({message:"missing post data"});
  }
  if(!req.body.text){
    res.status(400).json({message:"missing required text field"})
  }
  next();
  // do your magic!
}

module.exports = router;
