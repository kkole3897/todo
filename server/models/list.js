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
    addList
};
