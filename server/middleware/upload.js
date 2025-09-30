import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import 'dotenv/config'; // dotenv automatically load karega .env variables

// --- Cloudinary Config ---
cloudinary.config({
  cloud_name: 'dtvlnfakj',
  api_key: '551389693122312',
  api_secret: '2rTPcgfyRvFLsQA1GJJpxN9d2aE',
  secure: true
});


// --- Multer Storage for Cloudinary ---
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'winkly',                  // Cloudinary folder
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 400, height: 600, crop: "limit" }] // vertical-friendly
  }
});

// --- Multer Upload Setup ---
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 2 } // 2 MB limit
});

export default upload;
