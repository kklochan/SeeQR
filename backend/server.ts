import queryRouter from './routes/queryRouter';

const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');
const { Pool } = require('pg');
const users = {};
let dbnum = 0;

const server = express();
// const schemaRouter = require('./routes/schemaRouter');
// const dbRouter = require('./routes/dbRouter');

//Parsing Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.get('/', makeDB, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

server.use(express.static('dist'));

async function makeDB(req, res, next) {
  if(!('session_id' in req.cookies)) {
    const options = {
      method: 'POST',
      headers: { 
        'Authorization': 'Basic Ojg4MDVmN2U2LTBiZWUtNDcwNC04OWRlLTU5YmM2ZTJlNWEyYw==',
      }
    }
    const response = await fetch(`https://customer.elephantsql.com/api/instances?name=db${++dbnum}9&plan=turtle&region=amazon-web-services::us-east-1`, options);
    const data = await response.json();
    const { id, url } = data;
    const expiry = 300000;
    users[id] = new Pool({ connectionString: url });
    res.cookie('session_id', id, { maxAge: expiry});
    setTimeout(() => deleteDB(id), expiry); //1 minute
  }
  next();
}

async function deleteDB(id) {
  const options = {
    method: 'DELETE',
    headers: { 
      'Authorization': 'Basic Ojg4MDVmN2U2LTBiZWUtNDcwNC04OWRlLTU5YmM2ZTJlNWEyYw==',
    }
  }
  const response = await fetch(`https://customer.elephantsql.com/api/instances/${id}`, options);
  console.log(response.status);
}


// let static middleware do its job
// server.use(express.static(__dirname + '/public'));

//router for 'skip-file-upload', 'upload-file', and 'input-schema'
// server.use('/schema', schemaRouter);

//router for 'skip-file-upload', 'upload-file', and 'input-schema'
// server.use('/dbLists', dbRouter);

// router for 'execute-query-untracked', 'execute-query-tracked', 'generate-dummy-data'
server.put('/query/execute-query-tracked', async (req, res, next) => {
  // create data object to send back to client
  const frontendData = {
    queryData: null,
    queryStats: null,
  };
  // extract query string from client request
  const { queryString }  = req.body;
  // match the connection pool based on cookies
  const pool = users[req.cookies['session_id']];
  // retrieve query results and attach to frontend data object
  const rows = await pool.query(queryString);
  frontendData.queryData = rows;
  // Run EXPLAIN (FORMAT JSON, ANALYZE)
  if (!queryString.match(/create/i)) {
    const queryStats = await pool.query('EXPLAIN (FORMAT JSON, ANALYZE) ' + queryString);
    frontendData.queryStats = queryStats;
  } 
  // send back to client
  return res.status(200).json(frontendData);
});

// default error handler
server.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

const port = process.env.port || 3000;
server.listen(port, () => console.log('listening on port 3000'));
