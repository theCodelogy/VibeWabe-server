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
const videoCollection = client.db(process.env.DB_NAME).collection("Videos")


const getVideos = async (req, res) => {
    const result = await videoCollection.find().toArray()
    res.send(result)
}

const getSingleVideos = async (req, res) => {
    console.log(req.params.id)
    const query = {_id: new ObjectId(req.params.id)}
    const result = await videoCollection.findOne(query)
    res.send(result)
}
const createVideo = async (req, res) => {
    const video = req.body;
    const result = await videoCollection.insertOne(video)
    res.send(result)
}
const deleteVideo = async(req,res)=>{
    const query={_id: new ObjectId(req.params.id)}
    const result = await videoCollection.deleteOne(query)
    res.send(result)
}

module.exports = {getVideos,getSingleVideos,createVideo,deleteVideo}