const express = require("express");
const paymentRouter = express.Router();
const { payment, successPayment, failedPay } = require("../Controler/Payment.js");

paymentRouter.post("/", payment);
paymentRouter.post("/success/:tranId", successPayment);
paymentRouter.post("/failedPay/:tranId", failedPay);

module.exports = paymentRouter;
