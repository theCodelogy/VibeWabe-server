const express = require("express");
const orderRouter = express.Router();
const {
  getAllOrder,
  getUserOrder,
  createOrder,
  deleteOrder
} = require("../Controler/Order");

orderRouter
  .get("/", getAllOrder)
  .get("/:email", getUserOrder)
  .post("/", createOrder)
  .delete("/:id", deleteOrder)

module.exports = orderRouter;