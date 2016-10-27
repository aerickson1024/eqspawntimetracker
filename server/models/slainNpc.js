var mongoose = require('mongoose');

var slainNpcSchema = new mongoose.Schema({
  userId: {
    type: String,
    lowercase: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  spawnTime: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('slainNpc', slainNpcSchema);
