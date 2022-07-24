const logger = require('../../configs/logger');
const { database } = require('../../configs');
const mongoose = require('mongoose');
const pluralize = require('pluralize');

/**
 * Connect to MongoDB
 * @return {Promise<void>}
 */
async function connect() {
  try {
    const options = {
      autoIndex: false,
      maxPoolSize: 3,
      ssl: true
    };

    if (database.ssl === 'true') {
      logger.debug('Using certificate authentication for connecting with MongoDB');

      Object.assign(options, {
        ssl: true,
        sslCert: database.cert,
        sslKey: database.cert,
        dbName: database.dbName,
        authMechanism: 'MONGODB-X509',
        authSource: '$external'
      });
    } else if (database.user && database.password) {
      logger.debug('Using username and password authentication for connecting with MongoDB');

      options.user = database.user;
      options.pass = database.password;
      options.dbName = database.dbName;
    }

    // override mongoose pluralize function
    mongoose.pluralize(pluralize);
    // connect to mongoDB
    await mongoose.connect(database.url, options);

    logger.debug(`Successfully connected to MongoDB Database at "${database.url}"`);
  } catch (error) {
    logger.error(`Failed to connect to database at "${database.url}": ${error.message}`, {
      stack: error.stack
    });

    throw error;
  }
}

connect();
