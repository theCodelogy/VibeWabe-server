const express = require("express");
const MusicUserHistoryRouter = express.Router();
const {
    allHistory,
    postHistory,
    deleteHistory
} = require('../../Controler/Music/MusicUserHistory')

MusicUserHistoryRouter
    .get('/:email', allHistory)
    .post('/', postHistory)
    .delete('/:id', deleteHistory)


module.exports = MusicUserHistoryRouter;