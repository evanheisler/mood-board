if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const express = require('express');
const path = require('path');
const promise = require('bluebird');

const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);

const app = express();
const db = pgp(`${process.env.DATABASE_URL}?ssl=true`);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/ping', (req, res) => {
  res.json('pong');
});

app.get('/api/projects', (req, res) => {
  db.query('SELECT * FROM projects')
    .then(data => {
      res.json({
        data
      });
    })
    .catch(error => {
      console.log('ERROR:', error);
    });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Mood API listening on ${port}`);
