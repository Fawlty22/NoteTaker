const fs = require('fs');
const path = require('path');
const express = require('express');
const notes = require('./db/db.json')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  //notes
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  //api routes
  app.get('/api/notes', (req, res) => {
    res.json(notes)
  });

//   app.post('/api/notes', (req, res) => {
//       req.body.id = notes.length.toString();
//   });

  //catcher
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  
  //listener
  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });