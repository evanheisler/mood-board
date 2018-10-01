if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

app.get('/api/ping', (req, res) => {
  res.json('pong');
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Proji API listening on ${port}`);
