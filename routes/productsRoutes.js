const express = require('express')
const productController = require('../controllers/productController')
const routes = express.Router()

routes.get('/produts',productController.getProducts)