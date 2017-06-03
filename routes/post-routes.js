
// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    db.Previous.findAll({
      where: query
    }).then(function(dbPrevious) {
      res.json(dbPrevious);
    });
  });

  // Get rotue for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    db.Previous.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPrevious) {
      console.log(dbPrevious);
      res.json(dbPrevious);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    db.Previous.create(req.body).then(function(dbPrevious) {
      res.json(dbPrevious);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Previous.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPrevious) {
      res.json(dbPrevious);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Previous.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPrevious) {
        res.json(dbPrevious);
      });
  });
};
