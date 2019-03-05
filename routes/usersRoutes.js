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
        // Not secure here,I'd like to find a way to exlude the userData when sending it back

        // Possibilities:
        // Create a new object and push over only the event data
        // Make a second get request inside here if the request returns true
      res.json(dbUsers);
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
      res.json(dbUsers);
    });
  });
};
