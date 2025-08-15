// src/lib/api.ts
export interface Match {
  id: string;
  equipe1: string;
  equipe2: string;
  date: string;
  heure: string;
  lieu: string;
  score1?: number;
  score2?: number;
  statut: 'à venir' | 'terminé' | 'live';
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function getMatches() {
  const res = await fetch(`${API_URL}/matches`);
  if (!res.ok) throw new Error("Erreur lors du chargement des matchs");
  const data: Match[] = await res.json();

  // Mapping vers format front
  return data.map(m => ({
    id: m.id,
    team1: m.equipe1,
    team2: m.equipe2,
    date: m.date,
    time: m.heure,
    location: m.lieu,
    score1: m.score1,
    score2: m.score2,
    status: m.statut === 'terminé' ? 'finished' : m.statut === 'live' ? 'live' : 'upcoming'
  }));
}

export async function createMatch(match: {
  team1: string;
  team2: string;
  date: string;
  time: string;
  location: string;
}) {
  const body = {
    equipe1: match.team1,
    equipe2: match.team2,
    date: match.date,
    heure: match.time,
    lieu: match.location
  };
  const res = await fetch(`${API_URL}/matches`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error("Erreur lors de l'ajout du match");
  return res.json();
}

export async function deleteMatch(id: string) {
  const res = await fetch(`${API_URL}/matches/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erreur lors de la suppression");
}

export async function updateScore(id: string, score1: number, score2: number) {
  const res = await fetch(`${API_URL}/matches/${id}/score`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score1, score2 })
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour du score");
}
