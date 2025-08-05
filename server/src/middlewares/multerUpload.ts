import multer from 'multer';
import { join } from 'path';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    const destination = join(__dirname, '..', 'static');
    cb(null, destination);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 } });

export default upload;
