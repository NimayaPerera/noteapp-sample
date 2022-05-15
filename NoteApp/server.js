const express = require("express");
const cors = require("cors");
const app = express();
require("./models/db");
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "NoteApp API loaded" });
});

// set port, listen for request
//const PORT = process.env.PORT || 8080;
require("./routes/note.router")(app);
app.listen(3002, () => {
    console.log(`Server is running on port 3002`);
  });