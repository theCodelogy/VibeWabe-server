const express = require('express')
const videoRouter = express.Router()
const {getVideos,getSingleVideos,createVideo,deleteVideo} = require('../Controler/Video')

videoRouter
    .get('/', getVideos)
    .get('/:id', getSingleVideos)
    .post('/', createVideo)
    .delete('/:id', deleteVideo)

module.exports = videoRouter