require('dotenv').config();
const mysql = require('mysql2/promise');

const User = require('./user');
const Board = require('./board');
const Card = require('./card');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const user = new User(pool);
const board = new Board(pool);
const card = new Card(pool);

module.exports = {
  userModel: user,
  boardModel: board,
  cardModel: card,
};
