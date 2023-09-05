module.exports = (app) => {
  const userEvents = require("../controllers/userEvents.controller.js");

  var router = require("express").Router();

  router.post("/", userEvents.create);

  router.get("/", userEvents.findAll);

  router.delete("/:id", userEvents.delete);

  app.use("/api/userEvents", router);
};
