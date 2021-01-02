// const pg = require('pg');
// const { parse } = require('pg-connection-string');

// const config = parse(
//   'postgres://seeqradmin:Seeqradmin123!@seeqr-instance2.cafqffmgzmlc.us-east-1.rds.amazonaws.com:5432/ebdb'
// );

// const connection = pg.createConnection({
//   host: 'process.env.RDS_HOSTMNAME',
//   user: 'process.env.RDS_USERNAME',
//   password: 'process.env.RDS_PASSWORD',
//   port: 'process.env.RDS_PORT',
// });
// connection.connect((err) => {
//   if (err) {
//     console.log('Database connection failed');
//     return;
//   }
//   console.log('Connected to database');
// });

// connection.end();
