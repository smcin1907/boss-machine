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


/*
// Check to see if the parameter is in the database. Yes: attach, No: send error
apiRouter.param('modelType', (req, res, next, modelType) => {
    const dataArray = getAllFromDatabase(modelType);
    if (dataArray === null) {
        res.status(500).send('Parameter not held in database.');
    } else {
        req.dataArray = dataArray;
        next();
    }
})

// GET an array
apiRouter.get('/:modelType', (req, res, next) => {
    res.dataArray = req.dataArray;
    res.status(200).send(res.dataArray);
    next();
})
*/

module.exports = apiRouter;
