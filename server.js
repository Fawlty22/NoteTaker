const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
