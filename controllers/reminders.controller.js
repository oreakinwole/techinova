const Reminder = require("../models/reminder.model.js");
const Joi = require("joi");

function validate(req) {
  const schema = {
    user: Joi.number().required(),
    description: Joi.string().required(),
    date: Joi.string().required(),
  };

  return Joi.validate(req, schema);
}

// Create and Save a new Reminder
exports.create = (req, res) => {
  // Validate request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create a User
  const reminder = new Reminder({
    user: req.body.user,
    description: req.body.description,
    date: new Date(req.body.date),
  });

  // Save Reminder in the database
  Reminder.create(reminder, (err, data) => {
    if (err)
      res.status(500).send({
        message: err || "Some error occurred while creating the Reminder.",
      });
    // else res.status(201).json({});
    // else console.log(data);
    else res.status(201).send(reminder);
  });
};

exports.findAll = (req, res) => {
  Reminder.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Reminders.",
      });
    else res.status(200).send(data);

    // else res.status(201).json({data});
  });
};

exports.findOne = (req, res) => {
  Reminder.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `ID not found`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Reminder with id " + req.params.id,
        });
      }
    } else res.status(200).send(data);
  });
};

exports.handleModify = (req, res) => {
  res.status(405).json({
    message: `This operation is Forbidden`,
  });
};
