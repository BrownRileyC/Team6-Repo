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
          { task: "Do some searching on the company and the position you are interviewing for.  Try to understand the company's mission and see if there is any recent news about them.", EventId: dbEvents.dataValues.id, type: 'Researching' },
          { task: "Every interview will have a time at the end for any questions you might have.  Find some!  If you liked you can bring a list of questions with you, but make sure its not info you can find right on the About Us section of their website.", EventId: dbEvents.dataValues.id, type: 'Researching' },
          { task: "Have your resume up to date.  Read over it to make sure it is accurate and possibly rework it to make sure you are highlighting the most relevant sections for this job.", EventId: dbEvents.dataValues.id, type: 'Documents' },
          { task: "Go back and look at the job posting.  See what parts you meet and if there are any requirements you do not.  Think about how you will go over those parts during your interview.", EventId: dbEvents.dataValues.id, type: 'Documents' },
          { task: "Shower or bath the morning of your interview, wear deoderant, and brush your teeth.  You should look clean and neat.", EventId: dbEvents.dataValues.id, type: 'Appearance' },
          { task: "Dress in a manner appropriate to the position you are applying for.  If you are unsure, dressing conservatively, like a dark colored suit, is a safe bet.", EventId: dbEvents.dataValues.id, type: 'Appearance' }
        ]).then(function (dbTasks) {
          res.json(dbEvents.dataValues.id);
        });
      } else if (req.body.eventType === "Networking") {
        db.Tasks.bulkCreate([
          { task: "See if you can find a list of the companies attending the event.  If you can try to find a few companies you absolutely would like to contact and do some research on them.", EventId: dbEvents.dataValues.id, type: 'Researching' },
          { task: "Have a clear goal in mind before you go.  You might simply want to listen and hear what skills companies are looking for or be on the hunt for one specific job.  ", EventId: dbEvents.dataValues.id, type: 'Researching' },
          { task: "Get business cards if you can.  Then make sure to bring more than you think you will need.  It can't hurt to hand them out.", EventId: dbEvents.dataValues.id, type: 'Documents' },
          { task: "You are going to hear a lot of stuff if you visit several companies.  It's going to be hard to remember it all, so bring something so you can take notes.  That way if someone follows up you can know for sure who they are and what they are about.", EventId: dbEvents.dataValues.id, type: 'Documents' },
          { task: "Shower or bath the morning of the event, wear deoderant, and brush your teeth.  You should look clean and neat.", EventId: dbEvents.dataValues.id, type: 'Appearance' },
          { task: "Dress in something comfortable, but professional.  You might have a lot of moving about as you go about the event and you wouldn't want your outfit to make you more uncomfortable.", EventId: dbEvents.dataValues.id, type: 'Appearance' }
        ]).then(function (dbTasks) {
          res.json(dbEvents.dataValues.id);
        });
      } else {
        db.Tasks.bulkCreate([
          { task: "Make sure your presentation is complete!", EventId: dbEvents.dataValues.id, type: 'Researching' },
          { task: "Know your slides very well, you shouldn't be reading off the slides as you present.", EventId: dbEvents.dataValues.id, type: 'Researching' },
          { task: "If you feel nervous about presenting from memory you can make note cards to list your main points to ensure you hit them all.", EventId: dbEvents.dataValues.id, type: 'Documents' },
          { task: "Make sure you have your references at the end of your presentation, there are several sites to help you format a bibliography.", EventId: dbEvents.dataValues.id, type: 'Documents' },
          { task: "Shower or bath the morning of your presentation, wear deoderant, and brush your teeth.  You should look clean and neat.", EventId: dbEvents.dataValues.id, type: 'Appearance' },
          { task: "Think about the scale of your presentation. A small presentation, like a class project, means you should be well groomed.  A business meeting, on the otherhand, calls for more care, you should be dressed professionaly.", EventId: dbEvents.dataValues.id, type: 'Appearance' }
        ]).then(function (dbTasks) {
          res.json(dbEvents.dataValues.id);
        });
      }
    });
});
module.exports = router;
