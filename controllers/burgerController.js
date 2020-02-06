let express = require("express");

let router = express.Router();

let burger = require("../models/burger.js");

router.get("/", function(req, res) {
  burger.all(function(data) {
   let hbsObject = {
      burger: data
    };
    res.render("index", hbsObject);
  });
});

router.post("/api/burger", function(req, res) {
  burger.create([
    "name"
  ], [
    req.body.name
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burger/:id", function(req, res) {
 let condition = "id = " + req.params.id;
  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burger/:id", function(req, res) {
 let condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
