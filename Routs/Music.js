const express = require('express')
const musicRouter = express.Router()
const {getMusics,getSingleMusic,createMusic,deleteMusic} = require('../Controler/Music')

musicRouter
    .get('/', getMusics)
    .get('/:id', getSingleMusic)
    .post('/', createMusic)
    .delete('/:id', deleteMusic)

module.exports = musicRouter