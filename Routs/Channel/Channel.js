const express = require('express')
const ChannelRouter = express.Router()
const { getChannels, getSingleChannel, createChannel, deleteChannel, patchChannel, updateChannel } = require('../../Controler/Channel/Channel')

ChannelRouter
    .get('/', getChannels)
    .post('/', createChannel)
    .get('/:id', getSingleChannel)
    .delete('/:id', deleteChannel)
    
    // .put("/:id", updateChannel)
    // .patch("/:id", patchChannel)
    

module.exports = ChannelRouter