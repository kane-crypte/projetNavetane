const express = require('express');
const cors = require('cors');
const matchesController = require('./controllers/matchesController');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/matches', matchesController.list);
app.post('/matches', matchesController.create);
app.put('/matches/:id/score', matchesController.updateScore);
app.delete('/matches/:id', matchesController.remove);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
