module.exports = (app) => {
  const notes = require("../controllers/note.controller.js");
  var router = require("express").Router();

  // Create a new note
  router.post("/", notes.create);

  // Retrieve all notes
  router.get("/", notes.findAll);

  // Retrieve all unarchived notes
  router.get("/nonArchivedList", notes.findAllUnArchived);

  // Retrieve all archived notes
  router.get("/ArchivedList", notes.findAllArchived);

  // Update a note with id
  router.put("/:id", notes.update);

  //Archive a saved note
  router.put("/archive/:id", notes.archive);

  //Unarchive a saved note
  router.put("/unarchive/:id", notes.unarchive);

  // Delete a Note with id
  router.delete("/:id", notes.delete);

  app.use("/api/notes", router);
};
