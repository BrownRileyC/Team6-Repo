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
            console.log(dbEvents);
            console.log(dbEvents.length);
            // console.log(dbEvents[0].Events.dataValues.id);

            var hbsObject = {
                Object: dbEvents
            }
            console.log(hbsObject);
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
            console.log(dbEvents[0]);
            var hbsObject = {
                Events: dbEvents[0].Tasks
            }
            res.render('event', hbsObject);
          });
})

router.get("/api/users/:userName/:password", function(req, res) {
  db.Users.findAll({
      include: [db.Events],
      where: {
      userName: req.params.userName,
      pWord: req.params.password
  }}).then(function(dbUsers) {
    res.json(dbUsers[0].dataValues.id);
  });
});

router.post("/api/users", function(req, res) {
  db.Users.create({
      userName: req.body.userName,
      pWord: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
  }).then(function(dbUsers) {
    console.log(dbUsers)
    res.json(dbUsers.id);
  });
});

module.exports = router;
