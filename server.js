
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');
const mysql = require('mysql2/promise');
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/config/config.js'))[env];


console.log(config);
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, username, password, database } = config;
  const connection = await mysql.createConnection({ host, port, user: username, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  const db = require("./models");
  db.sequelize.sync();
};

require("./routes/user.routes")(app);
require("./routes/gender.routes")(app);

// add views
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});