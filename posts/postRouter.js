const express = require('express');
const postDb = require("./postDb");
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  postDb.get().then(posts=>{
    res.status(201).json(posts);
  }).catch(err=>{
    console.log(err);
    res.status(201).json({message:"Error retriving posts"});
  })
});

router.get('/:id',validatePostId, (req, res) => {
  // do your magic!
  postDb.getById(req.params.id).then(post=>{
    res.status(201).json(post);
  }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"Error retriving posts"});
  })
});

router.delete('/:id',validatePostId, (req, res) => {
  // do your magic!
  postDb.remove(req.params.id).then(count=>{
    res.status(201).json({message:"Succesfully removed post"})
  }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"Error deleting post"});
  })
});

router.put('/:id',validatePostId, (req, res) => {
  // do your magic!
  if(!req.body.text){
    res.status(400).json({message:"missing required text field"})
  }
  postDb.update(req.params.id,req.body).then(count=>{
    postDb.getById(req.params.id).then(uPost=>{
      res.status(201).json(uPost);
    })
  }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"Error updating post"});
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  postDb.getById(req.params.id).then(post=>{
    post?next():res.status(400).json({ message: "invalid post id" });
  })
}

module.exports = router;
