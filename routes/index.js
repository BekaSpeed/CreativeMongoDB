var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var List = mongoose.model('List');

router.get('/playlist', function(req, res, next) {
  List.find(function(err, videos){
    if(err){ return next(err); }
    res.json(videos);
  });
});
router.post('/playlist', function(req, res, next) {
  var video = new List(req.body);
  video.save(function(err, video){
    if(err){ return next(err); }
    res.json(video);
  });
});
router.param('video', function(req, res, next, id) {
  var query = List.findById(id);
  query.exec(function (err, video){
    if (err) {return next(err); }
    if (!video) {return next(new Error("Can't find video")); }
    req.video = video;
    return next();
  });
});

router.get('/playlist/:video', function(req, res) {
   res.json(req.video);
});

router.put('/playlist/:video/upvote', function(req, res, next) {
  req.video.upvote(function(err, video){
    if (err) { return next(err); }
    res.json(video);
  });
});

router.delete('/playlist/:video', function(req, res) {
  console.log("in Delete");
  req.video.remove();
  res.sendStatus(200);
});


module.exports = router;
