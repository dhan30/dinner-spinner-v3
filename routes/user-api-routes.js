var db = require("../models");

module.exports = function(app) {
  // Find all Authors and return them to the user with res.json
  app.get("/api/authors", function(req, res) {
    db.Author.findAll({}).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.get("/api/authors/:id", function(req, res) {
     // Find one Author with the id in req.params.id and return them to the user with res.json
    db.Author.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.post("/api/authors", function(req, res) {
     // Create an Author with the data available to us in req.body
    console.log(req.body);
    db.Author.create(req.body).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.delete("/api/authors/:id", function(req, res) {
    // Delete the Author with the id available to us in req.params.id
    db.Author.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

};







// ===========================================================
// var db = require("../models");

// module.exports = function(app) {
//   // Find all Authors and return them to the user with res.json
//   app.get("/api/users", function(req, res) {
//     db.User.findAll({}).then(function(dbUser) {
//       res.json(dbUser);
//     });
//   });

//   app.get("/api/users/:id", function(req, res) {
//      // Find one Author with the id in req.params.id and return them to the user with res.json
//     db.User.findOne({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbUser) {
//       res.json(dbUser);
//     });
//   });

//   app.post("/api/users", function(req, res) {
//      // Create an Author with the data available to us in req.body
//     console.log(req.body);
//     db.User.create(req.body).then(function(dbUser) {
//       res.json(dbUser);
//     });
//   });

//   app.delete("/api/users/:id", function(req, res) {
//     // Delete the Author with the id available to us in req.params.id
//     db.User.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbUser) {
//       res.json(dbUser);
//     });
//   });

// };
