const express = require("express");
const errorHandler = require("./middlewares/errorHandler"); 
const warehousesroutes = require("./routes/warehouses");
const shipmentsroutes= require("./routes/shipments");
const driversroutes= require("./routes/drivers");
const vehiclesroutes = require("./routes/vehicles")

const app = express();
const PORT = 3000; 

app.use(express.json()); 
app.use("/warehouses", warehousesroutes); 
app.use("/shipments",shipmentsroutes);
app.use("/drivers",driversroutes);
app.use("/vehicles",vehiclesroutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});