const { ObjectId, client, dbName } = require('../../db')

const VideoSlidersCollection = client.db(dbName).collection("VideoSliders")


// get all slider
const allSliders = async (req, res) => {
    const result = await VideoSlidersCollection.find().toArray()
    res.send(result)
}

// get sigle slider
const singleSlider = async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await VideoSlidersCollection.find(query).toArray()
    res.send(result)
}



// Post Slider
const postSlider = async (req, res) => {
    const Slider = req.body;
    const result = await VideoSlidersCollection.insertOne(Slider)
    res.send(result)
}

// update Slider
const updateSlider = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const filter = { _id: new ObjectId(id) }
    const options = { upsert: true };
    const updateSliderData = {
        $set: {
            content: data.content,
            email: data.email
        },
    }
    const result = await VideoSlidersCollection.updateOne(filter, updateSliderData, options)
    res.send(result)
}

// Delete Slider
const deleteSlider = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const result = await VideoSlidersCollection.deleteOne(query)
    res.send(result)
}

module.exports = { allSliders, singleSlider, postSlider, updateSlider, deleteSlider }