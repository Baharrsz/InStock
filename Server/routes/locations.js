const express = require("express");
const router = express.Router();
const locationContent = require("../models/locations.json");

router.get("/content", (request, response) => {
  response.send(locationContent);
});

module.exports = router;
