// src/lib/api.ts
export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export type Match = {
  id: number;
  equipe1: string;
  equipe2: string;
  date: string;
  heure: string;
  lieu: string;
  score?: string | null;
  status?: 'scheduled'|'finished'|'live';
};

export type NewMatch = Omit<Match, 'id'>;

export async function listMatches(): Promise<Match[]> {
  const r = await fetch(`${BASE_URL}/matches`);
  if (!r.ok) throw new Error('Failed to fetch matches');
  return r.json();
}

export async function createMatch(m: NewMatch): Promise<Match> {
  const r = await fetch(`${BASE_URL}/matches`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(m)
  });
  if (!r.ok) throw new Error('Failed to create match');
  return r.json();
}

export async function deleteMatch(id: number): Promise<void> {
  const r = await fetch(`${BASE_URL}/matches/${id}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('Failed to delete match');
}

export async function updateMatchScore(id: number, score: string, status: 'finished'|'live' = 'finished') {
  const r = await fetch(`${BASE_URL}/matches/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ score, status })
  });
  if (!r.ok) throw new Error('Failed to update score');
  return r.json();
}
