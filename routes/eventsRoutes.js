var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/events/:eventID", function (req, res) {
    db.Events.findAll({
      include: [db.Tasks],
      where: {
        id: req.params.eventID
      }
    }).then(function (dbEvents) {
      res.json(dbEvents);
    });
  });

  app.get("/api/events/:userID", function (req, res) {
    db.Events.findAll({
      include: [db.Tasks],
      where: {
        userID: req.params.userID
      }
    }).then(function (dbEvents) {
      res.json(dbEvents);
    });
  });

  // Create a new example
  app.post("/api/events", function (req, res) {
    // Here I need to find a way to grab the current user's userID so we can properly make the association
    // Possibly we store the userID in localstorage when they log in so we can grab it as part of the post request?
    console.log(req.body);
    console.log(req.body.userID);

    db.Events.create({
      eventName: req.body.eventName,
      eventDate: req.body.eventDate,
      locationName: req.body.locationName,
      eventType: req.body.eventType,
      score: req.body.score,
      UserId: req.body.userID
    }
      , {
        include: [db.Users, db.Tasks]
      }).then(function (dbEvents) {
        if (req.body.eventType === "Interview") {
          db.Tasks.bulkCreate([
            { task: "First Interview Task", EventId: dbEvents.dataValues.id },
            { task: "Second Interview Task", EventId: dbEvents.dataValues.id },
            { task: "Third Interview Task", EventId: dbEvents.dataValues.id }
          ]).then(function (dbTasks) {
            res.redirect("/api/events/"+req.body.userID);
          });
        } else if (req.body.eventType === "Networking") {
          db.Tasks.bulkCreate([
            { task: "First Networking Task", EventId: dbEvents.dataValues.id },
            { task: "Second Networking Task", EventId: dbEvents.dataValues.id },
            { task: "Third Networking Task", EventId: dbEvents.dataValues.id }
          ]).then(function (dbTasks) {
            res.redirect("/api/events/"+req.body.userID);
          });
        } else {
          db.Tasks.bulkCreate([
            { task: "First Presentation Task", EventId: dbEvents.dataValues.id },
            { task: "Second Presentation Task", EventId: dbEvents.dataValues.id },
            { task: "Third Presentation Task", EventId: dbEvents.dataValues.id }
          ]).then(function (dbTasks) {
            res.redirect("/api/events/"+req.body.userID);
          });
        }
      });
  })
  // Delete an example by id
  app.delete("/api/events/:id", function (req, res) {
    db.Events.destroy({ where: { id: req.params.id } }).then(function (dbEvents) {
      res.json(dbEvents);
    });
  });
};
