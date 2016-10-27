var mongoose = require('mongoose');

var npcSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  respawnRate: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('npc', npcSchema);
