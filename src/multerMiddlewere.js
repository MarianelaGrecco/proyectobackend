import multer from 'multer';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const { type } = req.params;
      let uploadDir = '';
  
      if (type === 'profile') {
        uploadDir = 'uploads/profiles/';
      } else if (type === 'product') {
        uploadDir = 'uploads/products/';
      } else if (type === 'document') {
        uploadDir = 'uploads/documents/';
      } else {
        return cb('Invalid file type', null);
      }
  
      // Crea la carpeta de destino si no existe
      const dir = path.join(__dirname, '..', uploadDir);
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      // Utiliza el nombre original del archivo para guardarlo
      cb(null, file.originalname);
    },
  });
  
const upload = multer({ storage });
export default upload;
