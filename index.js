const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/ping', (req, res) => {
  res.json('pong');
});

app.get('/api/projects', (req, res) => {
  const exampleProjects = [
    {
      id: 1,
      name: 'Peoples Republic of Foo',
      description: null,
      status: [
        {
          name: 'client',
          charCode: '0x1F600',
          niceName: 'grinning'
        },
        {
          name: 'team',
          charCode: '0x1F600',
          niceName: 'grinning'
        }
      ]
    }
  ];
  res.json(exampleProjects);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Mood API listening on ${port}`);
