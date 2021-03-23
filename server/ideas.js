const express = require('express');
ideasRouter = express.Router();

// Require helper functions from db.js
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
  } = require('./db');

  
// Get all ideas
ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.status(200).send(ideas);
});


// Create an idea
ideasRouter.post('/', (req, res, next) => {
    const newidea = addToDatabase('ideas', req.body);
    res.status(201).send(newidea);
});


// Get a single idea
ideasRouter.get('/:ideaId', (req, res, next) => {
    const foundExpression = getFromDatabaseById('ideas', req.params.ideaId);
    if (foundExpression) {
      res.status(200).send(foundExpression);
    } else {
      res.status(404).send();
    }
});


// Update an idea
ideasRouter.put('/:ideaId', (req, res, next) => {
    const instanceIndex = updateInstanceInDatabase('ideas', req.body);
    if (instanceIndex) {
      res.status(200).send(instanceIndex);
    } else {
      res.status(404).send();
    }
});


// Delete an idea
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId)
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
});

  

module.exports = ideasRouter;