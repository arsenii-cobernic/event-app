const db = require("../models");
const Events = db.events;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const event = new Events({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    image: req.body.image,
    categories: req.body.categories,
  });

  event
    .save(event)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while creating the event.",
      });
    });
};

exports.findAll = (req, res) => {
  Events.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while retrieving events.",
      });
    });
};
