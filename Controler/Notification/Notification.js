const { ObjectId, client, dbName } = require('../../db')
// collection Name
const notificationCollection = client.db(dbName).collection("Notifications")


// get all notifications
const getNotifications = async (req, res) => {
    const page = parseInt(req.query.page)
    let query = {}
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    // filter notification by user type
    if (req.query.notificationFor) {
        query.notificationFor = { $regex: new RegExp(req.query.notificationFor, 'i') }
    }
    // filter notification by date
    if (req.query.lastDate) {
        query.date = {
            $gte: new Date(),
            $lte: new Date(req.query.lastDate)
        }
    }
    const result = await notificationCollection.find(query).skip(page * limit).limit(limit).toArray()
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
    notificationCollection
}