import multer from "multer";

const multer_foto = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/upload/users')
    },
    filename: (req, file, cb) => {
      //cb(null, Date.now().toString() + "_" + file.originalname)
      cb(null, file.originalname)
    }
  }),
  fileFilter: (req, file, cb) => {
    const extensaoimg = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp'].find
    (formatoAceito => formatoAceito == file.mimetype);

    if (extensaoimg){
        return cb(null, true);
    }

    return cb(null, false);
  }
})

export default multer_foto;;