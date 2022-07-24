const { database } = require('../../configs');

/**
 * Get connection options
 * @return {object}
 */
module.exports = function getOptions() {
  const options = {
    autoIndex: false
  };

  Object.assign(options, {
    ssl: true,
    sslCert: database.cert,
    sslKey: database.cert,
    authMechanism: 'MONGODB-X509',
    authSource: '$external'
  });
  return options;
};
