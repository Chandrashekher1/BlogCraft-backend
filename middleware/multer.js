// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Create uploads folder if it doesn't exist
// const uploadDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//     console.log("File MIME Type:", file ? file.mimetype : 'No file provided');
//     if (!file) {
//         console.log("No file provided in request.");
//         cb(new Error('No file provided'), false);
//     } else if (allowedTypes.includes(file.mimetype)) {
//         console.log("File type allowed:", file.mimetype);
//         cb(null, true);
//     } else {
//         console.log("File type rejected:", file.mimetype);
//         cb(new Error('Only JPEG, PNG, and GIF images are allowed'), false);
//     }
// };

// const upload = multer({
//     storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//     fileFilter
// });

// module.exports = upload;