const { ObjectId, client, dbName } = require('../../db')

const videoCollection = client.db(dbName).collection("Videos")


// Get all Videos
const getVideos = async (req, res) => {
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

    if (req.query.hero) {
        query.hero = { $regex: new RegExp(req.query.hero, 'i') }
    }

    if (req.query.tags) {
        query.tags = { $regex: new RegExp(req.query.tags, 'i') }
    }

    if (req.query.sortby) {
        sort[req.query.sortby] = req.query.sort ? parseInt(req.query.sort) : 1
    }
    const result = await videoCollection.find(query).sort(sort).skip(page * limit).limit(limit).toArray()
    res.send(result)
}

// Get single video by id
const getSingleVideos = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    if (req.query.admin === 'true') {
        const exVideoData = await videoCollection.findOne(query)
        res.send(exVideoData)
    } else {
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

}


// Upload Video
const createVideo = async (req, res) => {
    const video = req.body;
    const result = await videoCollection.insertOne(video)
    res.send(result)
}

// update video by put operation
const updateVideo = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const filter = { _id: new ObjectId(id) }
    const options = { upsert: true };
    const updateVideo = {
        $set: {
            title: data.title,
            url: data.url,
            category: data.category,
            thambnail: data.thambnail,
            description: data.description,
            rating: data.rating,
            language: data.language,
            hero: data.hero,
            date: data.date,
            tags: data.tags,
            featured: data.featured,
            recommended: data.recommended,
            view: data.view
        },
    }
    const result = await videoCollection.updateOne(filter, updateVideo, options)
    res.send(result)
}


// patch video data for update recommended and featured
const patchVideo = async (req, res) => {
    const data = req.body
    const query = { _id: new ObjectId(req.params.id) }
    const updateVideo = {
        $set: data
    }
    const result = await videoCollection.updateOne(query, updateVideo)
    res.send(result)
}

// Delete Video
const deleteVideo = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const result = await videoCollection.deleteOne(query)
    res.send(result)
}

module.exports = { getVideos, getSingleVideos, createVideo, deleteVideo, patchVideo, updateVideo }