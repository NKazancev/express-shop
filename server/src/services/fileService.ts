import { existsSync } from 'fs';
import { unlink } from 'fs/promises';
import { join } from 'path';

class FileService {
  static async removeFile(path: string) {
    const imagepath = join(__dirname, '..', 'static', path);
    if (existsSync(imagepath)) {
      await unlink(imagepath);
    }
  }
}

export default FileService;
