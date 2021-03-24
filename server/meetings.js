const express = require('express');
meetingsRouter = express.Router();

// Require helper functions from db.js
const {
    createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase
  } = require('./db');

  
// Get all meetings
meetingsRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.status(200).send(meetings);
});


// Create an meeting
meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = createMeeting();
    addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});


// Delete all meetings
meetingsRouter.delete('/', (req, res, next) => {
    const deleted = deleteAllFromDatabase('meetings')
    if (deleted !== null) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
});

  

module.exports = meetingsRouter;