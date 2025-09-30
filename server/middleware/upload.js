import multer from 'multer';
import path from 'path';

// Files ko disk par store karne ke liye storage engine set karo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Files 'uploads/' folder mein save hongi
  },
  filename: function (req, file, cb) {
    // Har file ke liye ek unique naam generate karo
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Sirf image files ko allow karne ke liye file filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MB file size limit
  },
  fileFilter: fileFilter
});

export default upload;