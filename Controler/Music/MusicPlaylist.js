const { ObjectId, client, dbName } = require('../../db')
// collection name
const MusicPlaylistCollection = client.db(dbName).collection("MusicPlaylist")


// get all playlist
const allPlaylist = async (req, res) => {
    const result = await MusicPlaylistCollection.find().toArray()
    res.send(result)
}



// get all indivitual user  playlist  by email
const indivitualUserPlaylist = async (req, res) => {
    const email = req.params.email;
    const query = { email: email }
    const page = parseInt(req.query.page)
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    const result = await MusicPlaylistCollection.find(query).sort({ _id: -1 }).skip(page * limit).limit(limit).toArray()
    res.send(result)
}

// Post playlist
const postPlaylist = async (req, res) => {
    const playlist = req.body;
    const result = await MusicPlaylistCollection.insertOne(playlist)
    res.send(result)
}



// Delete VideoComment
const deletePlaylist = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const result = await MusicPlaylistCollection.deleteOne(query)
    res.send(result)
}

module.exports = {
    allPlaylist,
    indivitualUserPlaylist,
    postPlaylist,
    deletePlaylist
}