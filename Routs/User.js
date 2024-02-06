const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  getUser,
  getSingleUser,
  deleteUser,
  patchUser 
} = require("../Controler/User");

userRouter
  .get("/", getUser)
  .get("/:email", getSingleUser)
  .post("/", createUser)
  .patch("/:id", patchUser )
  .delete("/:email", deleteUser)

module.exports = userRouter;
