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

function getCardsByUserId(userId) {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT List.list_id, title, card_id, description
            FROM User NATURAL JOIN List JOIN Card
            ON List.list_id = Card.list_id
            WHERE user_id = ? AND List.removed = 0 AND Card.removed = 0;`,
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

function updateCardDescription(cardId, description) {
    return new Promise((resolve, reject) => {
        pool.query(
            `UPDATE Card
            SET description = ?
            WHERE card_id = ?;`,
            [description, cardId],
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


function addCard(listId, description) {
    return new Promise((resolve, reject) => {
        pool.query(
            `INSERT INTO Card(list_id, description, removed)
            VALUES(?, ?, 0);`,
            [listId, description],
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

function removeCard(cardId) {
    return new Promise((resolve, reject) => {
        pool.query(
            `UPDATE Card
            SET removed = 1
            WHERE card_id = ?;`,
            [cardId],
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

function changeIncludedList(cardId, newListId) {
    return new Promise((resolve, reject) => {
        pool.query(
            `UPDATE Card
            SET list_id = ?
            WHERE card_id = ? AND removed = 0;`,
            [newListId, cardId],
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

function updateAllValues(cardId, listId, description, removed) {
    return new Promise((resolve, reject) => {
        pool.query(
            `UPDATE Card
            SET (list_id, description, removed) = (?, ?, ?)
            WHERE card_id = ?;`,
            [listId, description, removed, cardId],
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
    updateCardDescription,
    addCard,
    removeCard,
    changeIncludedList,
    updateAllValues
};
