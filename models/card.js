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

function getCardsByUserId(id) {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT List.list_id, title, card_id, description
            FROM User NATURAL JOIN List JOIN Card
            ON List.list_id = Card.list_id
            WHERE user_id = ? AND List.removed = 0 AND Card.removed = 0;`,
            [id],
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

function updateCardDescription(card_id, description) {
    return new Promise((resolve, reject) => {
        pool.query(
            `UPDATE Card
            SET description = ?
            WHERE card_id = ?`,
            [description, card_id],
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


function addCard(list_id, description) {
    return new Promise((resolve, reject) => {
        pool.query(
            `INSERT INTO Card(list_id, description, removed)
            VALUES(?, ?, 0)`,
            [list_id, description],
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

module.exports = {
    getCardsByUserId,
    updateCardDescription
};
