const { Router } = require('express');
const nextjs = require('next');
const some = require('lodash/some');

const dev = process.env.NODE_ENV === 'development';
const nextRouter = Router();
const nextApp = nextjs({
  dev,
  dir: './src',
});
const nextHandler = nextApp.getRequestHandler();

nextRouter.use(nextHandler);

const nextMiddleware = basePaths => {
  return (req, res, next) => {
    if (some(basePaths, x => req.path.startsWith(x))) {
      return next();
    }
    return nextHandler(req, res, next);
  };
};

module.exports = {
  nextApp,
  nextRouter,
  nextMiddleware,
};
