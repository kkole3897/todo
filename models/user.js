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

function findUserById(id) {
    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT user_id FROM `User` WHERE `user_id` = ?',
            [id],
            (err, results, fields) => {
                if (results.length > 0) resolve(results[0]['user_id']);
                else resolve(undefined);
                reject(err);
            }
        )
    })
}

function insertUserId(id) {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO User VALUES(?)',
            [id],
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
    findUserById,
    insertUserId
};