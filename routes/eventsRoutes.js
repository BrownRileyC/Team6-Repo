var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/events/:userID", function(req, res) {
    db.Events.findAll({
      include: [db.Tasks],
      where: {
      userID: req.params.userID
    }}).then(function(dbEvents) {
      res.json(dbEvents);
    });
  });

  // Create a new example
  app.post("/api/events", function(req, res) {
    // Here I need to find a way to grab the current user's userID so we can properly make the association
    // Possibly we store the userID in localstorage when they log in so we can grab it as part of the post request?
    console.log(req.body);
    
    db.Events.create({
      eventName: req.body.eventName,
      eventDate: req.body.eventDate,
      locationName: req.body.locationName,
      score: req.body.score,
      UserId: req.body.userID
      }
    , {
      include: [db.Users]
    }).then(function(dbEvents) {
      res.json(dbEvents);
    });
  });

  // Delete an example by id
  app.delete("/api/events/:id", function(req, res) {
    db.Events.destroy({ where: { id: req.params.id } }).then(function(dbEvents) {
      res.json(dbEvents);
    });
  });
};
