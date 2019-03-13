var db = require("../models");
var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
  res.render("index");
});

router.get('/api/events/:userID', function (req, res) {
  // var today = new Date();
  // var dd = today.getDate();
  // var mm = today.getMonth() + 1; //January is 0!
  // var yyyy = today.getFullYear();

  // today = mm + '/' + dd + '/' + yyyy;
  console.log(req.params.userID);
  console.log(req.baseUrl);

  console.log('After Redirect to /api/events ran========================================================================');

  db.Events.findAll({
    include: [db.Tasks],
    where: {
      userID: req.params.userID
      // eventDate: {
      //   $gte: today
      // }
    }
  }).then(function (dbEvents) {
    var hbsObject = {
      object: dbEvents
    }
    console.log('after findAll')
    console.log("Event Name: "+hbsObject.object[0].dataValues.eventName);
    res.render('index', hbsObject);
  }).catch(function(error){
    console.log(error);
  });
});

// router.get('api/events/past/:userID', function (req, res) {
//   var today = new Date();
//   var dd = today.getDate();
//   var mm = today.getMonth() + 1; //January is 0!
//   var yyyy = today.getFullYear();

//   today = mm + '/' + dd + '/' + yyyy;

//   console.log(req.baseUrl);
//   db.Events.findAll({
//     include: [db.Tasks],
//     where: {
//       userID: req.params.userID,
//       eventDate: {
//         $lte: today
//       }
//     }
//   }).then(function (dbEvents) {
//     var hbsObject = {
//       Object: dbEvents
//     }
//     res.render("index", hbsObject);
//   });
// });

router.get('/event/:eventID', function (req, res) {
  console.log('Did I go?')
  console.log(req.baseUrl);
  db.Events.findAll({
    include: [db.Tasks],
    where: {
      id: req.params.eventID
    }
  }).then(function (dbEvents) {
    console.log(dbEvents[0]);
    var hbsObject = {
      Events: dbEvents[0]
    }
    res.render('404', hbsObject);
  });
})

router.post("/api/users/login", function (req, res) {
  console.log(req.baseUrl);
  db.Users.findAll({
    include: [db.Events],
    where: {
      userName: req.body.userName,
      pWord: req.body.password
    }
  }).then(function (dbUsers) {
    console.log(dbUsers)
    res.json(dbUsers[0].dataValues.id);
  });
});

router.post("/api/users", function (req, res) {
  console.log(req.baseUrl);
  db.Users.create({
    userName: req.body.userName,
    pWord: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }).then(function (dbUsers) {
    console.log(dbUsers)
    res.json(dbUsers.id);
  });
});

router.post("/api/new/event", function (req, res) {
  // Here I need to find a way to grab the current user's userID so we can properly make the association
  // Possibly we store the userID in localstorage when they log in so we can grab it as part of the post request?
  console.log(req.body.userID);

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
          console.log(dbEvents.dataValues.id);
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
})

module.exports = router;