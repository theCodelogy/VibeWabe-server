const { ObjectId, client, dbName } = require('../../db')

const VideoCommentsCollection = client.db(dbName).collection("VideoComments")


// get all comments
const allComments = async (req,res)=>{
    const result = await VideoCommentsCollection.find().toArray()
    res.send(result)
}

// get sigle comment
const singleComment = async (req,res)=>{
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await VideoCommentsCollection.find(query).toArray()
    res.send(result)
}

// get all individual video  comments  by id
const getIndividualVideoComments = async (req, res) => {
    const id = req.params.id;
    const query = { videoId:id }
    const page = parseInt(req.query.page)
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    const result = await VideoCommentsCollection.find(query).sort({_id:-1}).skip(page * limit).limit(limit).toArray()
    res.send(result)
}

// Post Comment
const postComment = async (req, res) => {
    const comment = req.body;
    const result = await VideoCommentsCollection.insertOne(comment)
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
    const result = await VideoCommentsCollection.updateOne(filter, updateCommentData, options)
    res.send(result)
}

// Delete VideoComment
const deleteComment = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const result = await VideoCommentsCollection.deleteOne(query)
    res.send(result)
}

module.exports = {allComments,postComment,deleteComment,updateComment,singleComment,getIndividualVideoComments }