var bodyParser = require('body-parser');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post('/api/npcInformation', function(req, res) {
    if (req.body.Name) {
      res.json({
        message: req.body.Name
      });
    } else {
      res.status(404);
      res.json({
        message: 'Request contained no data'
      });
    }
  });
};
