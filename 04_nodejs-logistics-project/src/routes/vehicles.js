const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const vehiclesFilePath = path.join(__dirname, "../../data/vehicles.json");


const readVehicles = () => {
  const vehiclesData = fs.readFileSync(vehiclesFilePath);
  return JSON.parse(vehiclesData); 
};


const writeVehicles = (vehicles) => {
  fs.writeFileSync(vehiclesFilePath, JSON.stringify(vehicles, null, 2)); 
};


router.post("/", (req, res) => {
  const vehicles = readVehicles();
  const newVehicles = {
    id: vehicles.length + 1, 
    model: req.body.model, 
    year: req.body.year

  };
  vehicles.push(newVehicles);
  writeVehicles(vehicles);
  res.status(201).json({ message: "Vehicle created successfully", vehicle : newVehicles });
});


router.get("/", (req, res) => {
  const vehicles = readVehicles();
  res.json(vehicles);
});

router.get("/:id", (req, res) => {
  const vehicles = readVehicles();
  const vehicle = vehicles.find((t) => t.id === parseInt(req.params.id));
  if (!vehicle) {
    return res.status(404).json({ message: "vehicle not found" });
  }
  res.json(vehicle);
});


router.put("/:id", (req, res) => {
  const vehicles = readVehicles();
  const vehiclesIndex = vehicles.findIndex((t) => t.id === parseInt(req.params.id));
  if (vehiclesIndex === -1) {
    return res.status(404).json({ message: "Vehicle not found" });
  }
  const updateVehicles = {
    ...vehicles[vehiclesIndex],
    model: req.body.name,
    year: req.body.year
  };
  vehicles[vehiclesIndex] = updateVehicles;
  writeVehicles(vehicles);
  res.json({ message: "Vehicle successfully updated", driver : updateVehicles });
});

router.delete("/:id", (req, res) => {
  const vehicles = readVehicles();
  const newVehicles = vehicles.filter((t) => t.id !== parseInt(req.params.id));
  if (vehicles.length === newVehicles.length) {
    return res.status(404).json({ message: "Vehicle not found" });
  }
  writeVehicles(newVehicles);
  res.json({ message: "Vehicle successfully removed" });
});

module.exports = router;