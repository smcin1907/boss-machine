const express = require('express');
const apiRouter = express.Router();


// Import and mount the minionsRouter
const minionsRouter = require('./minions.js');
apiRouter.use('/minions', minionsRouter);


// Import and mount the ideasRouter
const ideasRouter = require('./ideas.js');
apiRouter.use('/ideas', ideasRouter);


// Import and mount the meetingsRouter
const meetingsRouter = require('./meetings.js');
apiRouter.use('/meetings', meetingsRouter);


module.exports = apiRouter;
