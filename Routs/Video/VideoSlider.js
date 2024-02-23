const express = require("express");
const VideoSliderRouter = express.Router();
const {
    allSliders,
    singleSlider,
    postSlider,
    updateSlider,
    deleteSlider
} = require('../../Controler/Video/VideoSlider')

VideoSliderRouter
    .get('/', allSliders)
    .get('/:id', singleSlider)
    .post('/', postSlider)
    .put('/:id', updateSlider)
    .delete('/:id', deleteSlider)


module.exports = VideoSliderRouter;