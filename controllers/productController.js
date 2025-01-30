const asyncHandler = require('../middlewares/asyncHandler')


exports.getProducts = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const {page=1, limit=10, name, category} = req.query;
    const {products} = await getProductService({})
})