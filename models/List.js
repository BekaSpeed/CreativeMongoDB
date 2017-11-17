var mongoose = require('mongoose');
var ListSchema = new mongoose.Schema({
  title:String,
  url:String,
  upvotes:{type: Number, default:0}
});
ListSchema.methods.upvote = function(cb) {
  this.upvotes+=1;
  this.save(cb);
};
mongoose.model ('List', ListSchema);