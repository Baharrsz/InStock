// initialize Express in project
const express = require("express");
const app = express();
const cors = require("cors");

// when the server receives a GET request to '/'
app.get("/", (req, res) => {
  // Response
  res.send("Express is running!");
});

// start Express on port 8080
app.listen(8080, () => {
  console.log("Server Started on http://localhost:8080");
  console.log("Press CTRL + C to stop server");
});
