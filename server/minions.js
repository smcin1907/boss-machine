const express = require('express');
minionsRouter = express.Router();

// Require helper functions from db.js
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
  } = require('./db');

  
// Get all minions
minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.status(200).send(minions);
});


// Create a minion
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});


// Get a single minion
minionsRouter.get('/:minionId', (req, res, next) => {
    const foundExpression = getFromDatabaseById('minions', req.params.minionId);
    if (foundExpression) {
      res.status(200).send(foundExpression);
    } else {
      res.status(404).send();
    }
});


// Update a minion
minionsRouter.put('/:minionId', (req, res, next) => {
    const instanceIndex = updateInstanceInDatabase('minions', req.body);
    if (instanceIndex) {
      res.status(200).send(instanceIndex);
    } else {
      res.status(404).send();
    }
});


// Delete a minion
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId)
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
});

  

module.exports = minionsRouter;