var bodyParser = require('body-parser');
var config = require('../config/config');
var npc = require('../models/npc');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post('/api/createNpc', function(req, res) {
    npc.findOne({
      name: req.body.Name
    }, function(err, foundNpc) {
      if (err) {
        throw err;
      }

      if (!foundNpc) {
        var newNpc = new npc({
          name: req.body.Name,
          respawnRate: req.body.RespawnRate
        });
        newNpc.save(function(err) {
          if (err) {
            return res.json({
              success: false,
              message: 'Unable to save new NPC to database'
            });
          }

          res.json({
            success: true,
            message: 'NPC successfully added to the database'
          });
        });
      } else {
        res.json({
          success: false,
          message: 'NPC already exists in the database'
        });
      }
    });
  });
}
