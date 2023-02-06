const multer = require('multer');

module.exports = (multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './api/public/upload/users')
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
}));