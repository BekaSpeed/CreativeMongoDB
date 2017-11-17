var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var List = mongoose.model('List');

router.get('/playlist', function(req, res, next) {
console.log("In GET route");
List.find(function(err,vidList) { 
  if (err) return console.error(err);
  else {
    res.json(vidList);    
    }
  });
});
router.post('/playlist', function(req, res, next) {
  var video = new List(req.body);
  video.save(function(err, video){
    if(err){ return next(err); }
    res.json(video);
  });
});

module.exports = router;
