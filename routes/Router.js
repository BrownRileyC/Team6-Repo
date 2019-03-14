var db = require("../models");
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render("index");
});

router.get('/:userID', function (req, res) {
  db.Events.findAll({
    include: [db.Tasks],
    where: {
      userID: req.params.userID
    }
  }).then(function (dbEvents) {
    var hbsObject = {
      Object: dbEvents
    }
    res.render("index", hbsObject);
  });
});

router.get('/event/:eventID', function (req, res) {
  db.Events.findAll({
    include: [db.Tasks],
    where: {
      id: req.params.eventID
    }
  }).then(function (dbEvents) {
    var hbsObject = {
      Object: dbEvents
    }
    res.render("event", hbsObject);
  });
})

router.post("/api/users/login", function (req, res) {
  db.Users.findAll({
    include: [db.Events],
    where: {
      userName: req.body.userName,
      pWord: req.body.password
    }
  }).then(function (dbUsers) {
    console.log(dbUsers)
    if (dbUsers.length < 1) {
      res.json(false)
    } else {
      res.json(dbUsers[0].dataValues.id);
    }
  });
});

router.post("/api/users", function (req, res) {
  db.Users.create({
    userName: req.body.userName,
    pWord: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }).then(function (dbUsers) {
    res.json(dbUsers.id);
  });
});

router.put('/api/score', function (req, res) {
  console.log(req.body);
  db.Events.update({
    score: req.body.score
  }, {
      where: {
        id: req.body.id
      }
    }).then(function (dbEvents) {
      res.json(dbEvents);
    });
});

router.put("/api/tasks", function (req, res) {
  db.Tasks.update({
    status: req.body.status
  }, {
      where: {
        id: req.body.id,
        EventId: req.body.EventId
      }
    }).then(function(data){
      res.json(data);
    })
});

// Delete an example by id
router.delete("/api/examples/:id", function (req, res) {
  db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
    res.json(dbExample);
  });
});

router.post('/api/tasks/new', function (req, res) {
  db.Tasks.create({
    task: req.body.task,
    EventId: req.body.EventId
  })
})

router.post("/api/new/event", function (req, res) {
  console.log("userID: " + req.body.userID);
  db.Events.create({
    eventName: req.body.eventName,
    eventDate: req.body.eventDate,
    locationName: req.body.locationName,
    eventType: req.body.eventType,
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
          res.json(dbEvents.dataValues.id);
        });
      } else if (req.body.eventType === "Networking") {
        db.Tasks.bulkCreate([
          { task: "First Networking Task", EventId: dbEvents.dataValues.id },
          { task: "Second Networking Task", EventId: dbEvents.dataValues.id },
          { task: "Third Networking Task", EventId: dbEvents.dataValues.id }
        ]).then(function (dbTasks) {
          res.json(dbEvents.dataValues.id);
        });
      } else {
        db.Tasks.bulkCreate([
          { task: "First Presentation Task", EventId: dbEvents.dataValues.id },
          { task: "Second Presentation Task", EventId: dbEvents.dataValues.id },
          { task: "Third Presentation Task", EventId: dbEvents.dataValues.id }
        ]).then(function (dbTasks) {
          res.json(dbEvents.dataValues.id);
        });
      }
    });
});
module.exports = router;
