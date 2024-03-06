const { ObjectId, client, dbName } = require('../../db')
// collection Name
const notificationCollection = client.db(dbName).collection("Notifications")


// get all notifications
const getNotifications = async (req, res) => {
    let query = {}
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    // filter notification by user type
    if (req.query.notificationFor) {
        query.notificationFor = { $regex: new RegExp(req.query.notificationFor, 'i') }
    }
    // filter notification by day limite
    if (req.query.totalDay) {
        const toDay = new Date()
        const previousDate= new Date(toDay.getTime() - (req.query.totalDay * 24 * 60 * 60 * 1000))
        query.date = {
            $gte: new Date(previousDate),
            $lte: new Date()
        }
    }
    const result = await notificationCollection.find(query).sort({ _id: -1 }).limit(limit).toArray()
    res.send(result)
}

// get singleNotification by id
const getSinglNotification = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const result = await notificationCollection.findOne(query)
    res.send(result)
}

// post new notification
const createNotification = async (req, res) => {
    const notification = req.body;
    const result = await notificationCollection.insertOne(notification)
    res.send(result)
}

// patch notification data for update notification view
const patchNotification = async (req, res) => {
    const data = req.body
    const query = { _id: new ObjectId(req.params.id) }
    const updateVideo = {
        $set: data
    }
    const result = await notificationCollection.updateOne(query, updateVideo)
    res.send(result)
}


// delete single notification
const deleteNotification = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const result = await notificationCollection.deleteOne(query)
    res.send(result)
}

module.exports = {
    getNotifications,
    getSinglNotification,
    createNotification,
    deleteNotification,
    patchNotification,
    notificationCollection
}