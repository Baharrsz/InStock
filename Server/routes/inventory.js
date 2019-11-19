const express = require("express");
const router = express.Router();
const uuid = require("uuid/v4");
const fs = require("fs");
const inventoryList = require("../models/inventory.json");

function writeJSONFile(filename, content) {
  fs.writeFile(filename, JSON.stringify(content), err => {
    if (err) console.log(err);
  });
  console.log(`changes saved to file ${filename}....`);
}

router.get("/", (req, res) => {
  res.json(inventoryList);
});

module.exports = router;
