const { ObjectId, client, dbName } = require('../db')
// collection name
const userCollection = client.db(dbName).collection("User")


// get all user
const getUser = async (req, res) => {
    const page = parseInt(req.query.page)
    let query = {}
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    // search user by name
    if (req.query.name) {
        query.name = { $regex: new RegExp(req.query.name, 'i') }
    }
    // filter user by role
    if (req.query.role) {
        query.role = { $regex: new RegExp(req.query.role, 'i') }
    }
    // filter admin user
    if (req.query.admin) {
        if (req.query.admin === 'true') {
            query.admin = true
        } else if (req.query.admin === 'false') {
            req.query.admin === 'false'
        }
    }

    const result = await userCollection.find(query).skip(page * limit).limit(limit).toArray()
    res.send(result)
}

// get single user by email
const getSingleUser = async (req, res) => {
    const query = { email: req.params.email }
    const result = await userCollection.findOne(query)
    res.send(result)
}

// post user data
const createUser = async (req, res) => {
    const user = req.body;
    const query = { email: user.email }
    const existingUser = await userCollection.findOne(query)
    // check user already exist or not in the userCollection
    if (existingUser) {
        return res.send({ message: 'user already exist', insertedId: null })
    }
    const result = await userCollection.insertOne(user)
    res.send(result)
}

// patch user data for admin role
const patchUser = async (req, res) => {
    const data = req.body
    const query = { _id: new ObjectId(req.params.id) }
    const updateUser = {
        $set: data
    }
    const result = await userCollection.updateOne(query, updateUser)
    res.send(result)
}

// delete user by email
const deleteUser = async (req, res) => {
    const query = { email: req.params.email }
    const result = await userCollection.deleteOne(query)
    res.send(result)
}

module.exports = {
    createUser,
    getUser,
    getSingleUser,
    deleteUser,
    patchUser,
    userCollection
}