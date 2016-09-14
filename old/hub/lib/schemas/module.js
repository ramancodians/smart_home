
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
  var Module = new Schema({
    _id                  : Schema.ObjectId,
    title                : String,
    components           : [Number],
    outgoing_topics      : [String],
    incoming_topics      : [String],
    hooks                : [{
      _id: false,
      topic: String,
      cond: String,
      target: String,
      events: [{
        _id: false,
        topic: String,
        payload: String
      }]
    }]
  });
  mongoose.model("Module", Module);
};
