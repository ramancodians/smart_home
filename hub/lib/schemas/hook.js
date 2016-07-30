
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CONDS = ['=', '<', '>'];
var EVENT_TYPES = ['sms', 'email', 'delay', 'pub'];

module.exports = function() {
  var Hook = new Schema({
    topic: {
      type: String,
      required: true
    },
    cond: {
      type: String,
      validate: {
        validator: (v) => (CONDS.indexOf(v) > -1),
        message: '{VALUE} is not a valid condition!'
      },
      required: true
    },
    target: {
      type: String,
      required: true
    },
    events: {
      type: [{
        _id: false,
        type: {
          type: String,
          validate: {
            validator: (v) => (EVENT_TYPES.indexOf(v) > -1),
            message: '{VALUE} is not a valid event type!'
          },
          required: true
        },
        topic: {
          type: String,
          required: true
        },
        payload: {
          type: String,
          required: true
        }
      }],
      required: true
    }
  });
  mongoose.model("Hook", Hook);
};
