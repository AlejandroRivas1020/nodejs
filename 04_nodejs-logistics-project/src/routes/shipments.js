const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const shipmentsFilePath = path.join(__dirname, "../../data/shipments.json");


const readShipments = () => {
  const shipmentsData = fs.readFileSync(shipmentsFilePath);
  return JSON.parse(shipmentsData); 
};


const writeShipments = (shipments) => {
  fs.writeFileSync(shipmentsFilePath, JSON.stringify(shipments, null, 2)); 
};


router.post("/", (req, res) => {
  const shipments = readShipments();
  const newShipments = {
    id: shipments.length + 1, 
    item: req.body.item, 
    quantity: req.body.quantity,
    warehouseId: req.body.warehouseId
  };
  shipments.push(newShipments);
  writeShipments(shipments);
  res.status(201).json({ message: "Shipment created successfully", shipment : newShipments });
});


router.get("/", (req, res) => {
  const shipments = readShipments();
  res.json(shipments);
});

router.get("/:id", (req, res) => {
  const shipments = readShipments();
  const shipment = shipments.find((t) => t.id === parseInt(req.params.id));
  if (!shipment) {
    return res.status(404).json({ message: "shipment not found" });
  }
  res.json(shipment);
});


router.put("/:id", (req, res) => {
  const shipments = readShipments();
  const shipmentsIndex = shipments.findIndex((t) => t.id === parseInt(req.params.id));
  if (shipmentsIndex === -1) {
    return res.status(404).json({ message: "Shipment not found" });
  }
  const updateShipments = {
    ...shipments[shipmentsIndex],
    item: req.body.item, 
    quantity: req.body.quantity,
    warehouseId: req.body.warehouseId
  };
  shipments[shipmentsIndex] = updateShipments;
  writeShipments(shipments);
  res.json({ message: "shipment successfully updated", shipment : updateShipments });
});

router.delete("/:id", (req, res) => {
  const shipments = readShipments();
  const newShipments = shipments.filter((t) => t.id !== parseInt(req.params.id));
  if (shipments.length === newShipments.length) {
    return res.status(404).json({ message: "Shipment not found" });
  }
  writeShipments(newShipments);
  res.json({ message: "Shipment successfully removed" });
});

module.exports = router;