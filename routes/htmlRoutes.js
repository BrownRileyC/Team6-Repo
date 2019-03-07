var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
<<<<<<< HEAD
      res.sendFile("./index.html")
  });

  app.get("/event", function(req, res) {
    res.sendFile("./event.html")
=======
      res.sendFile(path.join(__dirname, "./public/index.html"))
  });

  app.get("/event", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/event.html"))
>>>>>>> e5c8653810f77754575f97cf3aeaf43ce0427eb7
});
  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
