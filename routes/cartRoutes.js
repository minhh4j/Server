const express = require('express');
const authMiddlewares = require('../middlewares/authMiddlewares')
const cartController = require('../controllers/cartControllers');
const router = express.Router()

router.post('/cart/:productId', authMiddlewares,cartController.addProductToCart )
router.get('/cart' , authMiddlewares , cartController.getCartDeatails)
router.delete('/cart/:productId', authMiddlewares , cartController.deleteProductFromCart)
router.put('/cart/:productId/increase' , authMiddlewares , cartController.increaseCartQuantity)
router.put('/cart/:productId/decrease' , authMiddlewares , cartController.decreaseCartQuantity)

module.exports = router ;

