const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./matches.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    equipe1 TEXT NOT NULL,
    equipe2 TEXT NOT NULL,
    date TEXT NOT NULL,
    heure TEXT NOT NULL,
    lieu TEXT NOT NULL,
    score1 INTEGER DEFAULT NULL,
    score2 INTEGER DEFAULT NULL,
    statut TEXT DEFAULT 'à venir'
  )`);
});

module.exports = db;
