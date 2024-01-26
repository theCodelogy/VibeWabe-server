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
const musicCollection = client.db(process.env.DB_NAME).collection("Musics")

// Get all music
const getMusics = async (req, res) => {
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
    if (req.query.Singer) {
        query.Singer = { $regex: new RegExp(req.query.Singer, 'i') }
    }
    if (req.query.tags) {
        query.tags = { $regex: new RegExp(req.query.tags, 'i') }
    }
    if (req.query.sortby) {
        sort[req.query.sortby] = req.query.sort ? parseInt(req.query.sort) : 1
    }
    const result = await musicCollection.find(query).sort(sort).limit(limit).toArray()
    res.send(result)
}

// Get single music by id
const getSingleMusic = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const exMusicData = await musicCollection.findOne(query)
    const updateMusiView = {
        $set: {
            view: exMusicData.view ? exMusicData.view + 1 : 1
        }
    }
    const updateView = await musicCollection.updateOne(query, updateMusiView)
    const updateMusicData = await musicCollection.findOne(query)
    res.send(updateMusicData)
}

// Upload music
const createMusic = async (req, res) => {
    const video = req.body;
    const result = await musicCollection.insertOne(video)
    res.send(result)
}

// Delete music by id
const deleteMusic = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const result = await musicCollection.deleteOne(query)
    res.send(result)
}

module.exports = { getMusics, getSingleMusic, createMusic, deleteMusic }