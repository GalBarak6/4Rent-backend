const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)

        // const criteria = {}

        const collection = await dbService.getCollection('stay')
        var stays = await collection.find(criteria).toArray()
        // var stays = await collection.find({"reviewScores.rating": 5.0}).toArray()

        console.log({ stays })
        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        const stay = collection.findOne({ _id: ObjectId(stayId) })
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}

async function remove(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.deleteOne({ _id: ObjectId(stayId) })
        return stayId
    } catch (err) {
        logger.error(`cannot remove stay ${stayId}`, err)
        throw err
    }
}

async function add(stay) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.insertOne(stay)
        return stay
    } catch (err) {
        logger.error('cannot insert stay', err)
        throw err
    }
}

async function update(stay) {
    try {
        var id = ObjectId(stay._id)
        delete stay._id
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: id }, { $set: { ...stay } })
        return stay
    } catch (err) {
        logger.error(`cannot update stay ${stayId}`, err)
        throw err
    }
}


function _buildCriteria(filterBy) {
    logger.info('_buildCriteria', { filterBy })
    let criteria = {}

    if (filterBy.label !== '') {
        criteria = { ...criteria, labels: filterBy.label }
    }

    if (filterBy.type !== '') {
        criteria = { ...criteria, type: filterBy.type }
    }

    // if (filterBy.amenities !== '') {
    //     console.log({amenities})

    //     filterBy.amenities.forEach(amenity => {
    //         criteria = { ...criteria, amenities: amenity }
    //     })
    //     // db.getCollection("stay").find({"amenities": "Pool"})
    // }

    if (filterBy.price !== '') {
        criteria = {
            $or: [{ price: { $eq: +filterBy.price } }, { price: { $gt: +filterBy.price } }]

            // db.getCollection("stay").find({
            //     $or:[ {price: {$eq: 1000}}, {price: {$gt: 1000}} ] 
            //    })
        }
    }

    if (filterBy.rating !== '') {
        criteria = {
            "reviewScores.rating": +filterBy.rating
            // "reviewScores.rating": 5.0
            // db.getCollection("stay").find({"reviewScores.rating": 5.0})
        }
    }

    if (filterBy.city !== '') {

        criteria = {
            "loc.city": filterBy.city
        }
    }

        logger.info('_buildCriteria', { criteria })

        return criteria

    }

    module.exports = {
        remove,
        query,
        getById,
        add,
        update,
    }