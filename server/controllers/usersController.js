const knex = require("knex")(require("../../knexfile"));
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");

exports.index = (_req, res) => {
  knex("users")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving users: ${err}`));
};

exports.singleUser = (req, res) => {
  knex("users")
    .where({ id: req.params.id })
    .then((data) => {
      if (!data.length) {
        return res
          .status(404)
          .send(`Record with id: ${req.params.id} is not found`);
      }
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(404).send(`Error retrieving user ${req.params.id} ${err}`)
    );
};

exports.addUser = (req, res) => {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.phone_number ||
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.current_address ||
    !req.body.occupation ||
    !req.body.company
  ) {
    return res
      .status(400)
      .send(
        "Please make sure to provide email, password, phone_number, first_name, last_name, current_address, occupation, company fields in a request"
      );
  }

  const newUserId = uuidv4();
  knex("users")
    .insert({ ...req.body, id: newUserId })
    .then((_data) => {
      knex("users")
        .where({ id: newUserId })
        .then((data) => {
          res.status(201).json(data[0]);
        });
    })
    .catch((err) => res.status(400).send(`Error creating user: ${err}`));
};
