const cloudinary = require('./cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'Blog',
      allowed_format: ['jpg','jpeg','png'], 
      public_id: file.originalname.split('.')[0],
    };
  },
});

const upload = multer({ storage });
const uploadMultiple = upload.array('blog',5)
const uploadSingle = upload.single('profile')

module.exports = {
  uploadSingle,
  uploadMultiple
}