import multer from 'multer';
import { join } from 'path';

import ApiError from '../error/ApiError';
import ErrorMessage from '../error/errorMessage';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    const destination = join(__dirname, '..', 'static');
    cb(null, destination);
  },
  filename: (_, file, cb) => {
    const filename = file.originalname.split('.');
    const uploadedName = `${filename[0]}-${Date.now()}.${filename[1]}`;
    cb(null, uploadedName);
  },
});

const uploadImages = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: (_, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true);
    } else {
      callback(new ApiError(400, ErrorMessage.WRONG_IMAGE_FORMAT));
    }
  },
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 12 },
]);

export default uploadImages;
