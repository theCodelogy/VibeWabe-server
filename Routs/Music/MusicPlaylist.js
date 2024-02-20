const express = require("express");
const MusicPlaylistRouter = express.Router();
const { allPlaylist,
    indivitualUserPlaylist,
    postPlaylist,
    deletePlaylist } = require('../../Controler/Music/MusicPlaylist')

MusicPlaylistRouter
    .get('/', allPlaylist)
    .get('/:email', indivitualUserPlaylist)
    .post('/', postPlaylist)
    .delete('/:id', deletePlaylist)


module.exports = MusicPlaylistRouter;