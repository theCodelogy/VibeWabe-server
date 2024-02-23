const { ObjectId, client, dbName } = require('../../db')
// collection name
const MusicUserHistoryCollection = client.db(dbName).collection("UserMusicHistory")


// get all history
const allHistory = async (req, res) => {
    const email = req.params.email;
    const query = { email: email }
    const page = parseInt(req.query.page)
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    const result = await MusicUserHistoryCollection.find(query).sort({ _id: -1 }).skip(page * limit).limit(limit).toArray()
    res.send(result)
}


// Post history
const postHistory = async (req, res) => {
    const Slider = req.body;
    const result = await MusicUserHistoryCollection.insertOne(Slider)
    res.send(result)
}



// Delete history
const deleteHistory = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const result = await MusicUserHistoryCollection.deleteOne(query)
    res.send(result)
}

module.exports = {
    allHistory,
    postHistory,
    deleteHistory
}