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
    const page = parseInt(req.query.page)
    let query = {}
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    const sort = {};
    if (req.query.title) {
        query.title = { $regex: new RegExp(req.query.title, 'i') }
    }
    else if (req.query.category) {
        query.category = { $regex: new RegExp(req.query.category, 'i') }
    }
    else if (req.query.language) {
        query.language = { $regex: new RegExp(req.query.language, 'i') }
    }
    else if (req.query.recommended) {
        if (req.query.recommended === 'true') {
            query.recommended = true
        } else if (req.query.recommended === 'false') {
            req.query.recommended === 'false'
        }
    }
    else if (req.query.featured) {
        if (req.query.featured === 'true') {
            query.featured = true
        } else if (req.query.featured === 'false') {
            query.featured = false
        }

    }
    else if (req.query.Singer) {
        query.Singer = { $regex: new RegExp(req.query.Singer, 'i') }
    }
    else if (req.query.tags) {
        query.tags = { $regex: new RegExp(req.query.tags, 'i') }
    }
    else if (req.query.sortby) {
        sort[req.query.sortby] = req.query.sort ? parseInt(req.query.sort) : 1
    }
    const result = await musicCollection.find(query).sort(sort).skip(page * limit).limit(limit).toArray()
    res.send(result)
}

// Get single music by id
const getSingleMusic = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    if (req.query.admin === 'true') {
        const exMusicData = await musicCollection.findOne(query)
        res.send(exMusicData)
    } else {
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

}

// Upload music
const createMusic = async (req, res) => {
    const video = req.body;
    const result = await musicCollection.insertOne(video)
    res.send(result)
}

// update Music by put operation
const updateMusic = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const filter = { _id: new ObjectId(id) }
    const options = { upsert: true };
    const updateMusicData = {
        $set: {
            title: data.title,
            url: data.url,
            category: data.category,
            thambnail: data.thambnail,
            description: data.description,
            rating: data.rating,
            language: data.language,
            singerName: data.singerName,
            date: data.date,
            featured: data.featured,
            recommended: data.recommended,
            view: data.view
        },
    }
    const result = await musicCollection.updateOne(filter, updateMusicData, options)
    res.send(result)
}

// patch Music data for update recommended and featured
const patchMusic = async (req, res) => {
    const data = req.body
    const query = { _id: new ObjectId(req.params.id) }
    const updateMusic = {
        $set: data
    }
    const result = await musicCollection.updateOne(query, updateMusic)
    res.send(result)
}

// Delete music by id
const deleteMusic = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const result = await musicCollection.deleteOne(query)
    res.send(result)
}

module.exports = { getMusics, getSingleMusic, createMusic, deleteMusic, updateMusic, patchMusic }