const express = require("express");
const VideoCommentRouter = express.Router();
const {
    allComments,
    getIndividualVideoComments,
    postComment,
    deleteComment,
    updateComment,
    singleComment
} = require('../../Controler/Video/VideoComment')

VideoCommentRouter
    .get('/', allComments)
    .get('/:id', singleComment)
    .get('/individual/:id', getIndividualVideoComments)
    .post('/', postComment)
    .put('/:id', updateComment)
    .delete('/:id', deleteComment)


module.exports = VideoCommentRouter;