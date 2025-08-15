import { useEffect, useState } from "react";
import { getMatches, createMatch, deleteMatch, updateScore } from "../lib/api";
import { Match } from "../lib/api";
//corriger erreur sur updateScore 
export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadMatches() {
    setLoading(true);
    try {
      const now = new Date();
      const data = await getMatches();

      const updated = data.map(m => {
        const matchDateTime = new Date(`${m.date}T${m.time}`);
        if (matchDateTime < now && m.status === "upcoming") {
          return { ...m, status: "finished" };
        }
        return m;
      });

      setMatches(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function addMatch(match: {
    team1: string;
    team2: string;
    date: string;
    time: string;
    location: string;
  }) {
    await createMatch(match);
    await loadMatches();
  }

  async function removeMatch(id: string) {
    try {
      await deleteMatch(id);
      await loadMatches();
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  }

  async function setMatchScore(id: string, score1: number, score2: number) {
    try {
      await updateScore(id, score1, score2);
      await loadMatches();
    } catch (err) {
      console.error("Erreur score :", err);
    }
  }

  useEffect(() => {
    loadMatches();
  }, []);

  return {
    matches,
    loading,
    addMatch,
    removeMatch,
    setMatchScore,
    reload: loadMatches
  };
}
