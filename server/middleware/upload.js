// middleware/upload.js
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import 'dotenv/config';

// --- Cloudinary Config ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dtvlnfakj',
  api_key: process.env.CLOUDINARY_API_KEY || '551389693122312',
  api_secret: process.env.CLOUDINARY_API_SECRET || '2rTPcgfyRvFLsQA1GJJpxN9d2aE',
  secure: true
});

// --- Multer Storage for Cloudinary ---
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'winkly',                  // Cloudinary folder
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 400, height: 600, crop: "limit" }] // optional
  }
});

// --- Multer Upload ---
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

export default upload;
