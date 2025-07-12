const express = require('express')
const router = express.Router()
const { addproductController, getAllproductController, editproductController, deleteproductController } = require('../controller/productController')

router.post('/add', addproductController)
router.get('/get/all', getAllproductController)
router.put('/edit/:productId', editproductController)
router.delete('/delete/:productId', deleteproductController)

module.exports = router
