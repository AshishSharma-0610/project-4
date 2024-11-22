import { multerUpload } from '../config/cloudinary.js';
import multer from 'multer';
import asyncHandler from 'express-async-handler';

const uploadMiddleware = (fieldName) => asyncHandler(async (req, res, next) => {
  const uploadSingle = multerUpload.single(fieldName);

  uploadSingle(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(400);
        throw new Error('File size cannot exceed 5MB');
      }
      res.status(400);
      throw new Error(err.message);
    } else if (err) {
      res.status(400);
      throw new Error(err.message);
    }
    next();
  });
});

export default uploadMiddleware;