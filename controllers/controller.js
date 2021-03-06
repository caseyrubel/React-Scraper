// Import dependencies.
var express = require('express');

// Initialize express router.
var router = express.Router();

// Import models.
var Article = require('../models/Article');

// This is the route we will send GET requests to retrieve 
// We will call this route the moment our page gets rendered
router.get("/api/saved", function(req, res) {
  Article.find({}, function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  })
});

// This is the route we will send POST requests to save each article.
router.post("/api/saved", function(req, res) {
  var NewSave = new Article({
  articleID: req.body.articleID,
  title: req.body.title,
  url: req.body.url,
  date: req.body.date
});

//Check if Article already exists
Article.find({articleID: req.body.articleID}, function(err, doc) {
    if (doc.length === 0) {
      NewSave.save(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          res.send(doc);
        }
      })
    }
  })
});


router.delete("/api/saved", function(req, res) {
  Article.findOneAndRemove({
    articleID: req.body.articleID}, function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  })
});


module.exports = router;