const { ObjectId, client, dbName } = require('../../db');
const { notificationCollection } = require('../Notification/Notification');

const channelCollection = client.db(dbName).collection("channel");


// Upload channel data
const createChannel = async (req, res) => {
    const channel = req.body;
    const result = await channelCollection.insertOne(channel)
    if(req.query.notifyingUser==='true'){
        const notification = {
            title:channel.title,
            notificationFor:'premium',
            category:'channel',
            contentThambnail:channel.thambnail,
            date:new Date(),
            contentId:result.insertedId,
        }
        notificationCollection.insertOne(notification)
    }
    res.send(result)
}

//Get Channel Data by Tags
const getChannels = async(req, res) => {
    let result;
    if(req.query.tags){
        result = await channelCollection.find({tags : {"$in": [req.query.tags]}}).toArray();
    }else{
        result = await channelCollection.find().toArray();
    }
    res.send(result);
}


// Get all channels
const getAllChannels = async (req, res) => {
    const page = parseInt(req.query.page)
    let query = {}
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    const sort = {};
    if (req.query.title) {
        query.title = { $regex: new RegExp(req.query.title, 'i') }
    }

    if (req.query.category) {
        query.category = { $regex: new RegExp(req.query.category, 'i') }
    }

    if (req.query.language) {
        query.language = { $regex: new RegExp(req.query.language, 'i') }
    }

    if (req.query.recommended) {
        if (req.query.recommended === 'true') {
            query.recommended = true
        } else if (req.query.recommended === 'false') {
            req.query.recommended === 'false'
        }
    }

    if (req.query.featured) {
        if (req.query.featured === 'true') {
            query.featured = true
        } else if (req.query.featured === 'false') {
            query.featured = false
        }

    }

    // if (req.query.hero) {
    //     query.hero = { $regex: new RegExp(req.query.hero, 'i') }
    // }
    if (req.query.views) {
        query.views = { $regex: new RegExp(req.query.views, 'i') }
    }

    if (req.query.tags) {
        query.tags = { $regex: new RegExp(req.query.tags, 'i') }
    }

    if (req.query.sortby) {
        sort[req.query.sortby] = req.query.sort ? parseInt(req.query.sort) : 1
    }
    const result = await channelCollection.find(query).sort(sort).skip(page * limit).limit(limit).toArray()
    res.send(result)
}

// Get single channel by id
const getSingleChannel = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    if (req.query.admin === 'true') {
        const exData = await channelCollection.findOne(query)
        res.send(exVideoData)
    } else {
        const exData = await channelCollection.findOne(query)
        const updateVideo = {
            $set: {
                view: exData.view ? exData.view + 1 : 1
            }
        }
        const updateView = await channelCollection.updateOne(query, updateVideo)
        const updateVideoData = await channelCollection.findOne(query)
        res.send(updateVideoData)
    }

}

// Delete Channel Video
const deleteChannel = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const result = await channelCollection.deleteOne(query)
    res.send(result)
}

module.exports = { getChannels, createChannel, getAllChannels, getSingleChannel, deleteChannel  }