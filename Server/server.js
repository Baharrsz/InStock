// initialize Express in project
const express = require("express");
const app = express();
const cors = require("cors");
const location = require("./routes/locations");

// when the server receives a GET request to '/'
app.get("/", (req, res) => {
  // Response
  res.send("Express is running!");
});

app.use(cors());

app.use("/locations", location);

// start Express on port 8080
app.listen(8080, () => {
  console.log("Server Started on http://localhost:8080");
  console.log("Press CTRL + C to stop server");
});
