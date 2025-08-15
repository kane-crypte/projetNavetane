const db = require('../db');

exports.list = (req, res) => {
  db.all('SELECT * FROM matches ORDER BY date, heure', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const now = new Date();
    rows.forEach(match => {
      const matchDate = new Date(`${match.date}T${match.heure}`);
      if (matchDate < now && match.statut === 'à venir') {
        match.statut = 'terminé';
      }
    });

    res.json(rows);
  });
};

exports.create = (req, res) => {
  const { equipe1, equipe2, date, heure, lieu } = req.body;
  if (!equipe1 || !equipe2 || !date || !heure || !lieu) {
    return res.status(400).json({ error: 'Champs manquants' });
  }
  const stmt = `INSERT INTO matches (equipe1, equipe2, date, heure, lieu) VALUES (?, ?, ?, ?, ?)`;
  db.run(stmt, [equipe1, equipe2, date, heure, lieu], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
};

exports.updateScore = (req, res) => {
  const { id } = req.params;
  const { score1, score2 } = req.body;
  db.run(
    'UPDATE matches SET score1 = ?, score2 = ?, statut = "terminé" WHERE id = ?',
    [score1, score2, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ ok: true });
    }
  );
};

exports.remove = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM matches WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  });
};
