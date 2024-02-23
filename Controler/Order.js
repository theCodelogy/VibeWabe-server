const { ObjectId, client, dbName } = require('../db')
// collection name
const orderCollection = client.db(dbName).collection("Orders")


// get all order
const getAllOrder = async (req, res) => {
    const page = parseInt(req.query.page)
    let query = {}
    // filter order by package name
    if (req.query.package) {
        query.package = { $regex: new RegExp(req.query.package, 'i') }
    }
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    const result = await orderCollection.find(query).skip(page * limit).limit(limit).toArray()
    res.send(result)
}

// get indevidual user order
const getUserOrder = async (req, res) => {
    const query = { email: req.params.email }
    const result = await orderCollection.find(query).toArray()
    res.send(result)
}

// post order
const createOrder = async (req, res) => {
    const order = req.body;
    const result = await orderCollection.insertOne(order)
    res.send(result)
}

// delete order
const deleteOrder = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) }
    const result = await orderCollection.deleteOne(query)
    res.send(result)
}

module.exports = {
    orderCollection,
    getAllOrder,
    getUserOrder,
    createOrder,
    deleteOrder
}