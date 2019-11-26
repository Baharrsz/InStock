const express = require("express");
const router = express.Router();
const locationContent = require("../models/locations.json");
const productInfo = require("../models/inventory.json");

router.get("/content", (request, response) => {
  response.send(locationContent);
});

router.get("/productInfo", (request, response) => {
  response.send(productInfo);
});

module.exports = router;
