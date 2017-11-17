var mongoose = require('mongoose');
var ListSchema = new mongoose.Schema({
  title:String,
  url:String,
});
mongoose.model ('List', ListSchema);