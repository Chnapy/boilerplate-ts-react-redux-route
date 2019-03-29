import { Middleware } from 'redux';

const crashReporterMiddleware: Middleware = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error('!Exception!', err);

    throw err;
  }
};

export default crashReporterMiddleware;
