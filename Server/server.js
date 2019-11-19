// initialize Express in project
const express = require("./node_modules/express");
const app = express();
const cors = require("./node_modules/cors/lib");

app.use(cors());
app.use(express.json());

// when the server receives a GET request to '/'
app.get("/", (req, res) => {
  // Response
  res.send("Express is running!");
});

app.use("/inventory", require("./routes/inventory"));

// start Express on port 8080
app.listen(8080, () => {
  console.log("Server Started on http://localhost:8080");
  console.log("Press CTRL + C to stop server");
});
