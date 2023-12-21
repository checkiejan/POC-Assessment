const multer = require('multer');

// Set up storage (in this example, using diskStorage)
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/'); // Destination folder
//     },
//     filename: function(req, file, cb) {
//         const fileName = file.fieldname + '-' + Date.now() + '-' + file.originalname;
//         req.fileName = fileName;
//         cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
//     }
// });

// Filter files (optional, e.g., for accepting only certain file types)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

const upload = multer({ 
    // storage: storage,
    storage: multer.memoryStorage(),
    fileFilter: fileFilter
}).single("file");


module.exports = upload;
