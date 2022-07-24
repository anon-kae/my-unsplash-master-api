const dotenv = require('dotenv');
const path = require('path');
const joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const schemaEnv = joi.object()
  .keys({
    NODE_ENV: joi.string().valid('production', 'development', 'test').required(),
    PORT: joi.number().default(8000),
    STATIC_URL: joi.string().required(),
    CORS_WHITELIST_ORIGINS: joi.string().required(),
    DB_URL: joi.string().required().description('Mongo DB url'),
    DB_SSL: joi.boolean().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_SSL_CERT: joi.string().required(),
    DB_NAME: joi.string().required(),
  })
  .unknown();

const { value, error } = schemaEnv.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: value.NODE_ENV,
  port: value.PORT,
  constants: {
    staticURL: value.STATIC_URL,
    whitelistOrigins: value.CORS_WHITELIST_ORIGINS
  },
  database: {
    url: value.DB_URL,
    ssl: value.DB_SSL,
    user: value.DB_USER,
    password: value.DB_PASSWORD,
    cert: value.DB_SSL_CERT,
    dbName: value.DB_NAME,
  },
};
