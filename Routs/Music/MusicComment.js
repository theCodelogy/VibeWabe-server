const express = require("express");
const MusicCommentRouter = express.Router();
const {
    allComments,
    singleComments,
    postComment,
    deleteComment,
    updateComment,
    individualMusicComments } = require('../../Controler/Music/MusicComment')

MusicCommentRouter
    .get('/', allComments)
    .get('/:id', singleComments)
    .get('/individual/:id', individualMusicComments)
    .post('/', postComment)
    .put('/:id', updateComment)
    .delete('/:id', deleteComment)


module.exports = MusicCommentRouter;