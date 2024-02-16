const express = require('express')
const videoRouter = express.Router()
const { getVideos, getSingleVideos, createVideo, deleteVideo, patchVideo, updateVideo } = require('../../Controler/Video/Video')

videoRouter
    .get('/', getVideos)
    .get('/:id', getSingleVideos)
    .post('/', createVideo)
    .put("/:id", updateVideo)
    .patch("/:id", patchVideo)
    .delete('/:id', deleteVideo)

module.exports = videoRouter