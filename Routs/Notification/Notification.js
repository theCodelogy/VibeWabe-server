const express = require("express");
const notificationRouter = express.Router();
const {
    getNotifications,
    getSinglNotification,
    createNotification,
    patchNotification,
    deleteNotification
} = require("../../Controler/Notification/Notification");

notificationRouter
    .get("/", getNotifications)
    .get("/:id", getSinglNotification)
    .post("/", createNotification)
    .patch("/:id", patchNotification)
    .delete("/:id", deleteNotification)

module.exports = notificationRouter;