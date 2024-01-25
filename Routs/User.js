const express = require('express')
const userRouter = express.Router()
const { createUser, getUser, getSingleUser, deleteUser } = require('../Controler/User')


userRouter
    .get('/', getUser)
    .get('/:email', getSingleUser)
    .post('/', createUser)
    .delete('/:email', deleteUser)

module.exports = userRouter