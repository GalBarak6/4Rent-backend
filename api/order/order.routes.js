const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const {getOrders, updateOrder, getOrderById, addOrder } = require('./order.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getOrders)
router.get('/:id', getOrderById)
router.put('/:id', updateOrder)
router.post('/', addOrder)

// router.delete('/:id',  requireAuth, requireAdmin, deleteUser)
// router.post('/', requireAuth, requireAdmin, addOrder)

module.exports = router