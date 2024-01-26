require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.DB_uri;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const videoCollection = client.db(process.env.DB_NAME).collection("Videos")


// Get all Videos
const getVideos = async (req, res) => {
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
        console.log(req.query.language)
        query.language = { $regex: new RegExp(req.query.language, 'i') }
    }
    if (req.query.hero) {
        query.hero = { $regex: new RegExp(req.query.hero, 'i') }
    }
    if (req.query.tags) {
        query.tags = { $regex: new RegExp(req.query.tags, 'i') }
    }
    if (req.query.sortby) {
        sort[req.query.sortby] = req.query.sort ? parseInt(req.query.sort) : 1
    }
    const result = await videoCollection.find(query).sort(sort).limit(limit).toArray()
    res.send(result)
}

// Get single video by id
const getSingleVideos = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const exVideoData = await videoCollection.findOne(query)
    const updateVideo = {
        $set: {
            view: exVideoData.view ? exVideoData.view + 1 : 1
        }
    }
    const updateView = await videoCollection.updateOne(query, updateVideo)
    const updateVideoData = await videoCollection.findOne(query)
    res.send(updateVideoData)
}


// Upload Video
const createVideo = async (req, res) => {
    const video = req.body;
    const result = await videoCollection.insertOne(video)
    res.send(result)
}



// Delete Video
const deleteVideo = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const result = await videoCollection.deleteOne(query)
    res.send(result)
}

module.exports = { getVideos, getSingleVideos, createVideo, deleteVideo }