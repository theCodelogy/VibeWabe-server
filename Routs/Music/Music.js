const express = require('express')
const musicRouter = express.Router()
const {getMusics,getSingleMusic,createMusic,deleteMusic,updateMusic,patchMusic} = require('../../Controler/Music/Music')

musicRouter
    .get('/', getMusics)
    .get('/:id', getSingleMusic)
    .post('/', createMusic)
    .put('/:id', updateMusic)
    .patch('/:id', patchMusic)
    .delete('/:id', deleteMusic)

module.exports = musicRouter