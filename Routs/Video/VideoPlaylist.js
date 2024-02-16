const express = require("express");
const VideoPlaylistRouter = express.Router();
const {allPlaylist, 
    indivitualUserPlaylist,
    postPlaylist,
    deletePlaylist } = require('../../Controler/Video/VideoPlaylist')

VideoPlaylistRouter
    .get('/',allPlaylist )
    .get('/:email',indivitualUserPlaylist )
    .post('/', postPlaylist)
    .delete('/:id',deletePlaylist)


module.exports = VideoPlaylistRouter;