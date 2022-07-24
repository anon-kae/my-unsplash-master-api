const multer = require('multer');

const storage = (path) =>
  multer.diskStorage({
    destination: function(req, file, callback) {
      const { fieldname } = file;

      const condition = {
        'images-files': 'images/files'
      };

      path = `./public/${condition[fieldname]}`;

      callback(null, path);
    },
    filename(req, file, callback) {
      const { fieldname, originalname } = file;
      const split = originalname.split('.').length;
      const fileType = originalname.split('.')[split - 1];

      let newImage = `${Date.now('nano')}.${fileType}`;

      const renameFile = {
        'images-files': `image-${Date.now('nano')}.${fileType}`
      };

      newImage = renameFile[fieldname];

      callback(null, newImage);
    },
  });

module.exports = (path) => multer({ storage: storage(path) });
