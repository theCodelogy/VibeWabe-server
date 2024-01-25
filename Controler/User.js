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
const userCollection = client.db(process.env.DB_NAME).collection("User")


const getUser = async (req, res) => {
    const result = await userCollection.find().toArray()
    res.send(result)
}

const getSingleUser = async (req, res) => {
    const query = {email:req.params.email }
    const result = await userCollection.findOne(query)
    res.send(result)
}
const createUser = async (req, res) => {
    const user = req.body;
    const query = { email: user.email }
    const existingUser = await userCollection.findOne(query)
    if (existingUser) {
        return res.send({ message: 'user already exist', insertedId: null })
    }
    const result = await userCollection.insertOne(user)
    res.send(result)
}
const deleteUser = async(req,res)=>{
    const query={email:req.params.email}
    const result = await userCollection.deleteOne(query)
    res.send(result)
}

module.exports = {createUser,getUser,getSingleUser,deleteUser}