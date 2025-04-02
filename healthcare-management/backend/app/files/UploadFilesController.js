import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { Image } from './schema/ImageSchema.js';

const router = express.Router(); // You should use express.Router() for defining routes
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, and GIF are allowed.'));
    }
  },
});

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded.' });
      }
  
      // Use cloudinary uploader.upload with buffer, not path
      const result = await cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        async (error, result) => {
          if (error) {
            return res.status(500).send({ message: 'Cloudinary upload failed', error });
          }
  
          const imageData = {
            url: result.secure_url,
            public_id: result.public_id,
            type: result.format,
            size: result.bytes,
          };
  
          try {
            const image = new Image(imageData);
            await image.save();
            console.log('Image saved to database');
            res.status(200).send(image);
          } catch (dbError) {
            console.error('Database error:', dbError);
            res.status(500).send({ message: 'Failed to save image data to the database' });
          }
        }
      );
  
      // Upload the file buffer to Cloudinary
      result.end(req.file.buffer);
  
    } catch (err) {
      console.error('Error processing image upload:', err);
      res.status(500).send({ message: 'Error processing image upload.' });
    }
  });

export default router;
