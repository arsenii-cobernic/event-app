module.exports = (app) => {
  const events = require("../controllers/events.controller.js");

  var router = require("express").Router();

  router.post("/", events.create);

  router.get("/", events.findAll);

  app.use("/api/events", router);
};
