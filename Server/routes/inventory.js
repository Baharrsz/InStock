const express = require("express");
const router = express.Router();
const uuid = require("uuid/v4");
const fs = require("fs");
const inventoryList = require("../models/inventory.json");
const filePath = __dirname + "/../models/inventory.json";

function writeJSONFile(filename, content) {
  fs.writeFile(filename, JSON.stringify(content), err => {
    if (err) console.log(err);
  });
  console.log(`changes saved to file ${filename}....`);
}

router.get("/", (req, res) => {
  res.json(inventoryList);
});

router.get("/:id", (req, res) => {
  const match = inventoryList.find(product => product.id === req.params.id);
  if (match) res.json(match);
  else res.status(404).send("No product with such id");
});

router.post("/", (req, res) => {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    descriptionplus: req.body.description,
    date: req.body.date,
    quantity: req.body.quantity,
    status: req.body.status,
    customer: req.body.customer,
    warehouse: req.body.warehouse,
    city: req.body.city,
    country: req.body.country,
    id: uuid()
  };
  console.log(newProduct);
  inventoryList.push(newProduct);

  writeJSONFile(filePath, inventoryList);
  res.json(newProduct);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  let keep = inventoryList.filter(product => id !== product.id);
  writeJSONFile(filePath, keep);
  res.json(keep);
});

module.exports = router;
