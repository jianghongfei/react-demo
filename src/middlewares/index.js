import { applyMiddleware } from 'redux';

import error from './error';
import logger from './logger';

export default applyMiddleware(error, logger);
