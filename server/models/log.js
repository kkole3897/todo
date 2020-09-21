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

function getLogsByUserId(userId) {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT user_id, action, card_description, from_title, to_title, record_time
            FROM Log
            WHERE user_id = ?;`,
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

function addLog(userId, action, cardDescription, fromTitle, toTitle) {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO Log(user_id, `action`, card_description, from_title, to_title) \
            VALUES(?, ?, ?, ?, ?);',
            [userId, action, cardDescription, fromTitle, toTitle],
            (err, results, fields) => {
                try {
                    resolve(results);
                } catch {
                    reject(err);
                }
            }
        )
    })
}

module.exports = {
    getLogsByUserId,
    addLog
};
