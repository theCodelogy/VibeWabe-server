require('dotenv').config()
const { MongoClient, ServerApiVersion,ObjectId} = require('mongodb');
const uri = process.env.DB_uri;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const musicCollection = client.db(process.env.DB_NAME).collection("Musics")


const getMusics = async (req, res) => {
    const result = await musicCollection.find().toArray()
    res.send(result)
}

const getSingleMusic = async (req, res) => {
    console.log(req.params.id)
    const query = {_id: new ObjectId(req.params.id)}
    const result = await musicCollection.findOne(query)
    res.send(result)
}
const createMusic = async (req, res) => {
    const video = req.body;
    const result = await musicCollection.insertOne(video)
    res.send(result)
}
const deleteMusic = async(req,res)=>{
    const query={_id: new ObjectId(req.params.id)}
    const result = await musicCollection.deleteOne(query)
    res.send(result)
}

module.exports = {getMusics,getSingleMusic,createMusic,deleteMusic}