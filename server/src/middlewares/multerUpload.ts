import multer from 'multer';
import { join } from 'path';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    const destination = join(__dirname, '..', 'static');
    cb(null, destination);
  },
  filename: (_, file, cb) => {
    if (file.fieldname === 'image') {
      const name = `catalogue-${file.originalname}`;
      cb(null, name);
    }
    if (file.fieldname === 'images') {
      cb(null, file.originalname);
    }
  },
});

const uploadImages = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
}).fields([{ name: 'image' }, { name: 'images', maxCount: 12 }]);

export default uploadImages;
