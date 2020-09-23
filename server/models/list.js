const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'todo',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

function getLists(userId) {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT List.list_id, title, count(Card.card_id) as count
            FROM List LEFT OUTER JOIN (
                SELECT * FROM Card WHERE removed = 0
            ) as Card
            ON List.list_id = Card.list_id
            WHERE user_id = ?
            GROUP BY List.list_id;`,
            [userId],
            (err, results, fields) => {
                try {
                    resolve(results);
                } catch {
                    reject(err);
                }
            }
        );
    });
}

function addList(userId, title) {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO List(user_id, title)\
            VALUES(?, ?);',
            [userId, title],
            (err, results, fields) => {
                try {
                    resolve(results);
                } catch {
                    reject(err);
                }
            });
    });
}

module.exports = {
    getLists,
    addList
};
