const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '101.101.208.162',
    user: 'kjk',
    password: 'lodnKjk3897!',
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

module.exports = {
    findUserById
};