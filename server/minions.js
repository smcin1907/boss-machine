const express = require('express');
minionsRouter = express.Router();


// Require helper functions from db.js
const {
  createWork,
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
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if (minion) {
      res.status(200).send(minion);
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


// Save the minionId to the request body
minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  if (!minion) {
    res.status(404).send();
  } else {
    req.minion = minion;
    next();
  }
});


// Get an array of all work for the specified minon
minionsRouter.get('/:minionId/work', (req, res, next) => {
  const allWork = getAllFromDatabase('work');
  const work = allWork.filter(work => work.minionId === req.minion.id);
  res.status(200).send(work);
});


// Create a new work object and save it to the database
minionsRouter.post('/:minionId/work', (req, res, next) => {
  const newWork = addToDatabase('work', req.body);
  res.status(201).send(newWork);
});


// Update a single work by id
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if (req.minion.id !== req.body.minionId) {
    res.status(400).send();
  } else {
    updatedWork = updateInstanceInDatabase('work', req.body);
    res.send(updatedWork);
  }
});


// Delete a single work by id
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('work', req.params.workId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});


module.exports = minionsRouter;