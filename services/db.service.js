const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://gal6677:galbarak25@cluster0.yj5yc80.mongodb.net/?retryWrites=true&w=majority'

const config = require('../config')

module.exports = {
    getCollection
}

// Database Name
const dbName = 'stay_db'

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}




