var db = require("../models");

var express = require('express');

var router = express.Router();

module.exports = function(app) {
  // Get all examples
  router.get("/api/users/:userName/:password", function(req, res) {
    db.Users.findAll({
        include: [db.Events],
        where: {
        userName: req.params.userName,
        pWord: req.params.password
    }}).then(function(dbUsers) {
        // Still not sure on the security, but this redirects us to the event route with the userId rather than returning the user object
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
};

var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/users/:userName/:password", function(req, res) {
    db.Users.findAll({
        include: [db.Events],
        where: {
        userName: req.params.userName,
        pWord: req.params.password
    }}).then(function(dbUsers) {
        // Still not sure on the security, but this redirects us to the event route with the userId rather than returning the user object
      res.json(dbUsers[0].dataValues.id);
    });
  });

  // Create a new example
  app.post("/api/users", function(req, res) {
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
};

