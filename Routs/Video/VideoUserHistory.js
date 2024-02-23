const express = require("express");
const VideoUserHistoryRouter = express.Router();
const {
    allHistory,
    postHistory,
    deleteHistory
} = require('../../Controler/Video/VideoUserHistory')

VideoUserHistoryRouter
    .get('/:email', allHistory)
    .post('/', postHistory)
    .delete('/:id', deleteHistory)


module.exports = VideoUserHistoryRouter;