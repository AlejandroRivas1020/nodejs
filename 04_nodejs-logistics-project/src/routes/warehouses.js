const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const warehousesFilePath = path.join(__dirname, "../../data/warehouses.json");


const readWarehouses = () => {
  const warehousesData = fs.readFileSync(warehousesFilePath);
  return JSON.parse(warehousesData); 
};


const writeWareHouses = (warehouses) => {
  fs.writeFileSync(warehousesFilePath, JSON.stringify(warehouses, null, 2)); 
};


router.post("/", (req, res) => {
  const warehouses = readWarehouses();
  const newWarehouses = {
    id: warehouses.length + 1, 
    name: req.body.name, 
    location: req.body.location
  };
  warehouses.push(newWarehouses);
  writeWareHouses(warehouses);
  res.status(201).json({ message: "Warehouse created successfully", warehouse : newWarehouses });
});


router.get("/", (req, res) => {
  const warehouses = readWarehouses();
  res.json(warehouses);
});

router.get("/:id", (req, res) => {
  const warehouses = readWarehouses();
  const warehouse = warehouses.find((t) => t.id === parseInt(req.params.id));
  if (!warehouse) {
    return res.status(404).json({ message: "warehouse not found" });
  }
  res.json(warehouse);
});


router.put("/:id", (req, res) => {
  const warehouses = readWarehouses();
  const warehousesIndex = warehouses.findIndex((t) => t.id === parseInt(req.params.id));
  if (warehousesIndex === -1) {
    return res.status(404).json({ message: "Warehouse not found" });
  }
  const updateWarehouses = {
    ...warehouses[warehousesIndex],
    name: req.body.name,
    location: req.body.location
  };
  warehouses[warehousesIndex] = updateWarehouses;
  writeWareHouses(warehouses);
  res.json({ message: "successfully updated", warehouse : updateWarehouses });
});

router.delete("/:id", (req, res) => {
  const warehouses = readWarehouses();
  const newWarehouses = warehouses.filter((t) => t.id !== parseInt(req.params.id));
  if (warehouses.length === newWarehouses.length) {
    return res.status(404).json({ message: "Warehouse not found" });
  }
  writeWareHouses(newWarehouses);
  res.json({ message: "Warehouse successfully removed" });
});

module.exports = router;