const Note = require("../models/note.model.js");

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a Note
  const note = new Note({
    userId: req.body.userId,
    noteTitle: req.body.noteTitle,
    noteBody: req.body.noteBody,
    archiveFlag: req.body.archiveFlag,
    dateTime: req.body.dateTime,
  });
  // Save Note in the database
  Note.create(note, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    }
    //   else res.send(data);
    else res.send({ message: `Note was Created Successfully!` });
  });
};

// Retrieve all Notes from the database
exports.findAll = (req, res) => {
  const userId = req.params.id;
  Note.getAll(userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Notes.",
      });
    } else res.send(data);
  });
};

exports.findAllUnArchived = (req, res) => {
  const userId = req.params.id;
  Note.getAllUnArchived(userId,(err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving unarchived notes.",
      });
    } else res.send(data);
  });
};

//Retrieve all archived notes
exports.findAllArchived = (req, res) => {
  const userId = req.params.id;

  Note.getAllArchived(userId,(err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving archived notes.",
      });
    } else res.send(data);
  });
};

// Update a Note identified by the ID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.body);
  Note.updateById(req.params.id, new Note(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found note with ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating note with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

//Archieve a previously saved note
exports.archive = (req, res) => {
  Note.archiveById(req.params.id, (err, data) => {
    console.log(req.params.id);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found note with ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error archieving note with id " + req.params.id,
        });
      }
    } else res.send({ message: `Note was archived successfully!` });
  });
};

//Unarchieve a previously archived note
exports.unarchive = (req, res) => {
  Note.unarchiveById(
    req.params.id,

    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found note with ID ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error unarchieving note with id " + req.params.id,
          });
        }
      } else res.send({ message: `Note was unarchived successfully!` });
    }
  );
};

//Delete a note for passed ID IN request
exports.delete = (req, res) => {
  Note.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Note with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Note with id " + req.params.id,
        });
      }
    } else res.send({ message: `Note was deleted successfully!` });
  });
};
