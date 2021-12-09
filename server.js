const fs = require('fs');
const path = require('path');
const express = require('express');
const notes = require('./db/db.json');
const uniqid = require('uniqid');


const PORT = process.env.PORT || 3001;
const app = express();
//middleware
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
    // res.json(notes)
    res.sendFile(path.join(__dirname, '/db/db.json'));
  });

  app.post('/api/notes', (req, res) => {
    //create object with request, then create newNote.id
    let newNote = req.body
    let newID = uniqid();
    newNote.id = newID;

    //write posted data to file
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err
      let dbfile = JSON.parse(data)
      dbfile.push(newNote)
      fs.writeFile('./db/db.json', JSON.stringify(dbfile), 'UTF-8', err => {
        if (err) throw err
        console.log('Data saved!')
      })
    })
    //redirect
    res.redirect('/notes')
  });

  app.delete('/api/notes/:id', (req, res) => {
    let readfileSync = fs.readFileSync(path.join(__dirname, '/db/db.json'));
    let dbfile = JSON.parse(readfileSync)
    let currentID = req.params.id
    //filter database file and remove requested note
    let dbfileFiltered = dbfile.filter(note => note.id != currentID)
    //write database file with filtered array
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(dbfileFiltered))
    //status 
    res.sendStatus(200)

  });

  //catchall
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  
  //listener
  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });