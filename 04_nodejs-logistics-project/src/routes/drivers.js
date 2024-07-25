const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const driversFilePath = path.join(__dirname, "../../data/drivers.json");


const readDrivers = () => {
  const driversData = fs.readFileSync(driversFilePath);
  return JSON.parse(driversData); 
};


const writeDrivers = (drivers) => {
  fs.writeFileSync(driversFilePath, JSON.stringify(drivers, null, 2)); 
};


router.post("/", (req, res) => {
  const drivers = readDrivers();
  const newDrivers = {
    id: drivers.length + 1, 
    name: req.body.name, 
  };
  drivers.push(newDrivers);
  writeDrivers(drivers);
  res.status(201).json({ message: "Driver created successfully", driver : newDrivers });
});


router.get("/", (req, res) => {
  const drivers = readDrivers();
  res.json(drivers);
});

router.get("/:id", (req, res) => {
  const drivers = readDrivers();
  const driver = drivers.find((t) => t.id === parseInt(req.params.id));
  if (!driver) {
    return res.status(404).json({ message: "Driver not found" });
  }
  res.json(driver);
});


router.put("/:id", (req, res) => {
  const drivers = readDrivers();
  const driversIndex = drivers.findIndex((t) => t.id === parseInt(req.params.id));
  if (driversIndex === -1) {
    return res.status(404).json({ message: "Driver not found" });
  }
  const updateDrivers = {
    ...drivers[driversIndex],
    name: req.body.name, 
  };
  drivers[driversIndex] = updateDrivers;
  writeDrivers(drivers);
  res.json({ message: "Driver successfully updated", driver : updateDrivers });
});

router.delete("/:id", (req, res) => {
  const drivers = readDrivers();
  const newDrivers = drivers.filter((t) => t.id !== parseInt(req.params.id));
  if (drivers.length === newDrivers.length) {
    return res.status(404).json({ message: "Driver not found" });
  }
  writeDrivers(newDrivers);
  res.json({ message: "Driver successfully removed" });
});

module.exports = router;