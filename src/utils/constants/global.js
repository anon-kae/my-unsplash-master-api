const { constants } = require('../../configs');
const { whitelistOrigins } = constants;
const fs = require('fs');
const bcrypt = require('bcryptjs');

exports.WHITELIST_ORIGINS = whitelistOrigins.split(',');

exports.getUrlImage = (image) => {
  return image ? `${constants.staticURL}/${image}` : '';
};

exports.checkPassword = (password, passwordDb) => {
  return bcrypt.compareSync(password, passwordDb);
}

exports.createPasswordHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

exports.getPathImage = (image) => {
  image = image ? image.replace(/\\/g, '/').replace('public', 'static') : '';
  return image;
};

exports.unlinkFile = (files = []) => {
  files.forEach((element) => {
    fs.unlink(element.path, () => { });
  });
};
