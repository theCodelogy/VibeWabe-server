const express = require("express");
const notificationRouter = express.Router();
const {
    getNotifications,
    getSinglNotification,
    createNotification,
    deleteNotification
} = require("../../Controler/Notification/Notification");

notificationRouter
    .get("/", getNotifications)
    .get("/:id", getSinglNotification)
    .post("/", createNotification)
    .delete("/:id", deleteNotification)

module.exports = notificationRouter;