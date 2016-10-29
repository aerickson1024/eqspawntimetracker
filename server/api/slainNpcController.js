var bodyParser = require('body-parser');
var config = require('../config/config');
var npc = require('../models/npc');
var slainNpc = require('../models/slainNpc');

module.exports = function(app, io) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post('/api/slainNpc', function(req, res) {
    npc.findOne({
      name: req.body.Name
    }, function(err, foundNpc) {
      if (err) {
        throw err;
      }

      var npcInfo = foundNpc;
      var killInfo = req.body;

      if (!foundNpc) {
        createNewNpc(killInfo, function(ncpInfo) {
          recordSlainNpc(killInfo, ncpInfo, function() {
            res.json({
              success: true,
              message: req.body.Name + ' was added to the database and the kill was tracked.'
            });
          });
        });
      } else {
        recordSlainNpc(killInfo, npcInfo, function() {
          res.json({
            success: true,
            message: req.body.Name + ' was successfully tracked.'
          });
        });
      }
    });
  });

  function createNewNpc(killInfo, callback) {
    console.log(killInfo);
    var newNpc = new npc({
      name: killInfo.Name,
      respawnRate: 0
    });

    newNpc.save(function(err) {
      if (err) {
        return res.json({
          success: false,
          message: 'NPC was not able to save to the database.'
        });
      }

      npc.findOne({
        name: killInfo.Name
      }, function(err, foundNpc) {
        if (err) {
          throw err;
        }

        if (foundNpc) {
          callback(foundNpc);
        } else {
          res.json({ success: false, message: 'Something went wrong reading from the database.'})
        }
      });
    });
  }

  function recordSlainNpc(killInfo, npcInfo, callback) {
    var newKill = new slainNpc({
      userId: killInfo.UserId,
      name: killInfo.Name,
      spawnTime: Date.now() + npcInfo.respawnRate
    });

    newKill.save(function(err) {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Error saving slain NPC to database'
        });
      }

      io.emit('kill', {
        name: npcInfo.name,
        respawnRate: npcInfo.respawnRate
      });

      callback();
    });
  }
};
