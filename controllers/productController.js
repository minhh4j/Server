const { link } = require('joi');
const asyncHandler = require('../middlewares/asyncHandler')
const productServices = require('../services/productService')

exports.getProducts = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const {page=1, limit=10, name, category} = req.query;

    const { product, total, totalCatCategory, totalDogCategory } = await productServices.getProductService({
        id,
        category,
        name,
        page:parseInt(page),
        limit:parseInt(limit)
    })

    return res.status(200).json({
        success : true ,
        product : product.length ,
        total ,
        page : Math.ceil(total / limit), 
        currentPage : parseInt(page),
        product,
        totalDogCategory,
        totalCatCategory
    })
})