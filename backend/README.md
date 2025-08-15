# Navetane Backend (Express + SQLite)

## Setup
```bash
cd backend
npm install
npm run dev
# API on http://localhost:3001
```

## Routes
- `GET /matches` : liste des matchs
- `POST /matches` : créer un match `{equipe1,equipe2,date,heure,lieu}`
- `DELETE /matches/:id` : supprimer
- `PATCH /matches/:id` : `{score, status}` mettre à jour score ou statut
