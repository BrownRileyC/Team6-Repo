var db = require("../models");
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render("index");
});

router.get('/favicon.ico', function(req, res){
  res.sendStatus(204);
});

router.get('/:userID', function (req, res) {
  db.Events.findAll({
    include: [db.Tasks],
    where: {
      userID: req.params.userID
    }
  }).then(function (dbEvents) {
    var presentation = [];
    var networking = [];
    var interview = [];
    for (var i = 0; i < dbEvents.length; i++) {
      if (dbEvents[i].dataValues.eventType === 'Presentation') {
        presentation.push(dbEvents[i]);
      } else if (dbEvents[i].dataValues.eventType === 'Networking') {
        networking.push(dbEvents[i]);
      } else {
        interview.push(dbEvents[i]);
      };
    }
    var hbsObject = {
      Object: dbEvents,
      presentation: presentation,
      networking: networking,
      interview: interview

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
    var appearance = [];
    var researching = [];
    var documents = [];
    for (var i = 0; i < dbEvents[0].Tasks.length; i++) {
      if (dbEvents[0].Tasks[i].dataValues.type === 'Appearance') {
        appearance.push(dbEvents[0].Tasks[i]);
      } else if (dbEvents[0].Tasks[i].dataValues.type === 'Researching') {
        researching.push(dbEvents[0].Tasks[i]);
      } else {
        documents.push(dbEvents[0].Tasks[i]);
      };
    }
    var hbsObject = {
      Object: dbEvents,
      appearance: appearance,
      researching: researching,
      documents: documents
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
        id: req.body.id
      }
    }).then(function (data) {
      res.json(data);
    })
});

router.delete("/api/examples/:id", function (req, res) {
  db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
    res.json(dbExample);
  });
});

router.post('/api/tasks/new', function (req, res) {
  db.Tasks.create({
    task: req.body.task,
    type: req.body.type,
    EventId: req.body.eventID
  }, {
    include: [db.Events]
  }).then(function (dbTasks) {
      res.json(dbTasks);
    })
});

router.get('/api/tasks/:eventID', function(req, res){
  db.Tasks.findAll({
    where: {
      EventId: req.params.eventID
    }
  }).then(function(dbTasks){
    res.json(dbTasks.length);
  });
})

router.post("/api/new/event", function (req, res) {
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
          { task: "First Interview Researching Task", EventId: dbEvents.dataValues.id, type: 'Researching' },
          { task: "Second Interview Researching Task", EventId: dbEvents.dataValues.id, type: 'Researching' },
          { task: "First Interview Documents Task", EventId: dbEvents.dataValues.id, type: 'Documents' },
          { task: "Second Interview Documents Task", EventId: dbEvents.dataValues.id, type: 'Documents' },
          { task: "First Interview Appearance Task", EventId: dbEvents.dataValues.id, type: 'Appearance' },
          { task: "Second Interview Appearance Task", EventId: dbEvents.dataValues.id, type: 'Appearance' }
        ]).then(function (dbTasks) {
          res.json(dbEvents.dataValues.id);
        });
      } else if (req.body.eventType === "Networking") {
        db.Tasks.bulkCreate([
          { task: "First Networking Researching Task", EventId: dbEvents.dataValues.id, type: 'Researching' },
          { task: "Second Networking Researching Task", EventId: dbEvents.dataValues.id, type: 'Researching' },
          { task: "First Networking Documents Task", EventId: dbEvents.dataValues.id, type: 'Documents' },
          { task: "Second Networking Documents Task", EventId: dbEvents.dataValues.id, type: 'Documents' },
          { task: "First Networking Appearance Task", EventId: dbEvents.dataValues.id, type: 'Appearance' },
          { task: "Second Networking Appearance Task", EventId: dbEvents.dataValues.id, type: 'Appearance' }
        ]).then(function (dbTasks) {
          res.json(dbEvents.dataValues.id);
        });
      } else {
        db.Tasks.bulkCreate([
          { task: "First Presentation Researching Task", EventId: dbEvents.dataValues.id, type: 'Researching' },
          { task: "Second Presentation Researching Task", EventId: dbEvents.dataValues.id, type: 'Researching' },
          { task: "First Presentation Documents Task", EventId: dbEvents.dataValues.id, type: 'Documents' },
          { task: "Second Presentation Documents Task", EventId: dbEvents.dataValues.id, type: 'Documents' },
          { task: "First Presentation Appearance Task", EventId: dbEvents.dataValues.id, type: 'Appearance' },
          { task: "Second Presentation Appearance Task", EventId: dbEvents.dataValues.id, type: 'Appearance' }
        ]).then(function (dbTasks) {
          res.json(dbEvents.dataValues.id);
        });
      }
    });
});
module.exports = router;
