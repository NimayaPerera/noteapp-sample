const sql = require("./db");
// constructor
const Note = function (note) {
  (this.userId = note.userId),
    (this.noteTitle = note.noteTitle),
    (this.noteBody = note.noteBody),
    (this.archiveFlag = note.archiveFlag),
    (this.dateTime = note.dateTime);
};

//Insert a new note
Note.create = (newNote, result) => {
  sql.query("INSERT INTO notes SET ?", newNote, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(res);
    result(null, res);
  });
};

//select all notes
Note.getAll = (title, result) => {
  let query = "SELECT * FROM notes";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("notes: ", res);
    result(null, res);
  });
};

//Select unarchived notes
Note.getAllUnArchived = (result) => {
  sql.query("SELECT * FROM notes WHERE archiveFlag= '0' ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("notes: ", res);
    result(null, res);
  });
};

//Select archived notes
Note.getAllArchived = (result) => {
  sql.query("SELECT * FROM notes WHERE archiveFlag= '1' ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("notes: ", res);
    result(null, res);
  });
};

//Update an existing note
Note.updateById = (id, note, result) => {
  sql.query(
    "UPDATE notes SET noteTitle = ?, noteBody = ?, archiveFlag = ? ,dateTime = ?  WHERE ID = ?",
    [note.noteTitle, note.noteBody, note.archiveFlag, note.dateTime, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Note with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log(res);
      result(null, res);
    }
  );
};

//Archive a previously saved note
Note.archiveById = (id, result) => {
  sql.query(
    "UPDATE notes SET  archiveFlag = '1'  WHERE ID = ?",
    id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found note with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log(res);
      result(null, res);
    }
  );
};

//unarchive a previously archived note
Note.unarchiveById = (id, result) => {
  sql.query(
    "UPDATE notes SET  archiveFlag = '0'  WHERE ID = ?",
    id,
    (err, res) => {
      console.log(result);
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found note with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log(res);
      result(null, res);
    }
  );
};

//Delete a specific note
Note.remove = (id, result) => {
  sql.query("DELETE FROM notes WHERE ID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found note with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted note with id: ", id);
    result(null, res);
  });
};

module.exports = Note;
