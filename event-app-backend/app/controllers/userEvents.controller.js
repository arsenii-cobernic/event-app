const db = require("../models");
const UserEvents = db.userEvents;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const userEvent = new UserEvents({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    image: req.body.image,
    categories: req.body.categories,
  });

  userEvent
    .save(userEvent)
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
  UserEvents.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while retrieving events.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  UserEvents.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Event with id=${id}. It was not found.`
        });
      } else {
        res.send({
          message: "Event was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Event with id=" + id
      });
    });
};
