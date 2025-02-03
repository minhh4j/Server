const Product = require('../models/productModels')
const CustomError = require('../utils/customError')
const Wishlist = require('../models/wishlistModels')

const addWishlist = async (userId , productId) => {
    try{
        const product = await Product.findById({productId})
        if(!product) throw new CustomError('Product not found', 404)
    
        const wishlist = await Wishlist.findOne({userId: userId})
        if(!wishlist){
            wishlist = new Wishlist({userId : userId , item : []})
        }
    
        const existingProduct = wishlist.item.find((item) => item.productId.toString() === productId)
        if(existingProduct){
            return {
                massage: 'Product already exists in the wishlist',
                wishlist
            }
        }
        wishlist.item.push({productId})
        await wishlist.save()
        return wishlist ;
    }
    catch(error){
        throw error
    }
}

module.exports = {addWishlist } 