const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        // const criteria = _buildCriteria(filterBy)
        const criteria = {}

        const collection = await dbService.getCollection('stay')
        var stays = await collection.find(criteria).toArray()
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
        const addedStay = await collection.insertOne(stay)
        return addedStay
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

// function _buildCriteria(filterBy) {
//     logger.info('_buildCriteria', { filterBy })
//     let isInStock
//     let criteria = {}

//     if (filterBy.inStock === '' && filterBy.name !=='') {
//         criteria = {
//             name: filterBy.name ,
//         }
//     }else{
//         isInStock = (filterBy.inStock === "1") ? true : false
//         logger.info({ isInStock })
//         criteria = {
//             name: filterBy.name,
//             inStock: isInStock
//         }
//     }

//     logger.info('_buildCriteria', { criteria })

//     return criteria

// }

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}