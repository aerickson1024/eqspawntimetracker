var bodyParser = require('body-parser');
var config = require('../config/config');
var npc = require('../models/npc');
var slainNpc = require('../models/slainNpc');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post('/api/slainNpc', function(req, res) {
    npc.findOne({
      name: req.body.Name
    }, function(err, foundNpc) {
      if (err) {
        throw err;
      }

      if (!foundNpc) {
        var newNpc = new npc({
          name: req.body.Name,
          respawnRate: 0
        });

        newNpc.save(function(err) {
          if (err) {
            return res.json({
              success: false,
              message: 'NPC was not able to save to the database.'
            });
          }
          
          res.json({
            success: true,
            message: req.body.Name + ' was added to the database.'
          });
        });
      } else {
        var newKill = new slainNpc({
          userId: req.body.UserId,
          name: req.body.Name,
          spawnTime: Date.now() + foundNpc.respawnRate
        });
        newKill.save(function(err) {
          if (err) {
            console.log(err);
            return res.json({
              success: false,
              message: 'Error saving slain NPC to database'
            });
          }

          res.json({
            success: true,
            message: 'Slain NPC was successfully added to database'
          });
        });
      }
    });
  });
};
