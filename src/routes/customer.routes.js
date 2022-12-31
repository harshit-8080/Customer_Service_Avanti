const express = require("express");
const {auth} = require("../middlewares/auth");

const CustomerController = require("../controllers/customer.controller");

const CustomerRouter = express.Router();

CustomerRouter.post("/app-events", auth, CustomerController.subscribeEvents); 

CustomerRouter.post("/signup", CustomerController.signupCustomer);

CustomerRouter.get("/:customerId", auth, CustomerController.getCustomer);

CustomerRouter.get("/", auth, CustomerController.getAllCustomer);

CustomerRouter.post("/address",auth, CustomerController.addAddress);

CustomerRouter.delete("/address", CustomerController.deleteAddress); // for dev use

CustomerRouter.post("/cart", auth, CustomerController.addToCart); 

CustomerRouter.post("/order", auth, CustomerController.addOrder); 

module.exports = CustomerRouter;