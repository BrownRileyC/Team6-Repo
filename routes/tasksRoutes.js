var db = require("../models");

module.exports = function (app) {
  // create new task 
  app.post('/api/tasks/new', function(req, res) {
    db.Tasks.create({
      task: req.body.task,
      EventId: req.body.EventId
    })
  });
  // Get all examples
  app.put("/api/tasks", function (req, res) {
    db.Tasks.update({
      status: req.body.status
    }, {
      where: {
        id: req.body.id,
        EventId: req.body.EventId
      }
      }).then(function () {
        res.redirect("/api/events/single"+req.body.EventId);
      });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};