const { ObjectId, client, dbName } = require('../../db')

const MusicCommentsCollection = client.db(dbName).collection("MusicComments")


// get all comments
const allComments = async (req,res)=>{
    const result = await MusicCommentsCollection.find().toArray()
    res.send(result)
}

// get all comments
const singleComments = async (req,res)=>{
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) }
    const result = await MusicCommentsCollection.find(filter).toArray()
    res.send(result)
}


// get all individual music  comments  by id
const individualMusicComments = async (req, res) => {
    const id = req.params.id;
    const query = { videoId:id }
    const page = parseInt(req.query.page)
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    const result = await MusicCommentsCollection.find(query).sort({_id:-1}).skip(page * limit).limit(limit).toArray()
    res.send(result)
}

// Post Comment
const postComment = async (req, res) => {
    const comment = req.body;
    const result = await MusicCommentsCollection.insertOne(comment)
    res.send(result)
}

// update Comment
const updateComment = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const filter = { _id: new ObjectId(id) }
    const options = { upsert: true };
    const updateCommentData = {
        $set: {
            content:data.content,
            email:data.email
        },
    }
    const result = await MusicCommentsCollection.updateOne(filter, updateCommentData, options)
    res.send(result)
}

// Delete comment
const deleteComment = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const result = await MusicCommentsCollection.deleteOne(query)
    res.send(result)
}

module.exports = {allComments, singleComments,postComment,deleteComment,updateComment,individualMusicComments }