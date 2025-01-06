const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',  // Specify the directory to save the uploaded files
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit the file size to 1MB
    fileFilter: (req, file, cb) => {
        // Allowed file types
        const filetypes = /jpeg|jpg|png|gif/;
        // Check file extension
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check MIME type
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
}).single('photo'); // 'photo' is the name of the form field for file upload



module.exports = upload;