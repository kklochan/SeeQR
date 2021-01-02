const express = require('express');
const server = express();
const path = require('path');

server.use(express.static('dist'));

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
})

const port = process.env.port || 8081;
server.listen(port, () => console.log('listening on port 8081'));
