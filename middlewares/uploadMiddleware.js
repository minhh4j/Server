const multer = require('multer')
const cloudinary = require('../config/cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder: 'product',
        allowed_formats:['jpg', 'jpeg', 'png', 'gif', 'webp'],
    }
})

const upload = multer({storage:storage})
module.exports = upload ;