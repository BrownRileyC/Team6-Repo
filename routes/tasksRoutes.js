var db = require("../models");

module.exports = function (app) {

  // GET route for all of the tasks 
  app.get("/api/tasks", function(req,res){
        // findAll returns all entries for a table when used with no option
    db.Tasks.findAll({}).then(function(dbTask){
      // access to the task
      res.json(dbTask);
    })
  });

  // POST route for saving all of the tasks created
  app.post("/api/tasks",function(req,res){
    db.Tasks.create({
      task: req.body.task,
      status: req.body.status
    }).then(function(dbTask) {
      // We have access to the new task as an argument inside of the callback function
      res.json(dbTask);
    })
      .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
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