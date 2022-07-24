const compression = require('compression');
const express = require('express');
const cors = require('cors');
const rootRoutes = require('./routes/v1/root');
const routes = require('./routes/v1');
const helmet = require('helmet');
const config = require('./configs');
const morgan = require('./configs/morgan');
const { errorHandler } = require('./middlewares/error');
const { WHITELIST_ORIGINS } = require('./utils/constants/global');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use('/static', express.static('./public'));

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json({ limit: '100mb' }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// gzip compression
app.use(compression());

// set security cors
app.use(cors({
  origin: WHITELIST_ORIGINS,
  credentials: true,
}));

// root routes
app.use('/api', rootRoutes);

// v1 api routes
app.use('/api/v1', routes);

// handle error
app.use(errorHandler);

module.exports = app;
