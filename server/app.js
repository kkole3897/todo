const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const router = require('./routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(cors());

app.use('/', router);

app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something broke');
});

module.exports = app;
