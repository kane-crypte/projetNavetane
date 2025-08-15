// src/hooks/useMatches.ts (version API)
import { useEffect, useState } from 'react';
import type { Match, NewMatch } from '@/types/match';
import { listMatches, createMatch as apiCreate, deleteMatch as apiDelete, updateMatchScore as apiUpdate } from '@/lib/api';

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await listMatches();
        setMatches(data);
      } catch (e:any) {
        setError(e.message || 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addMatch = async (m: NewMatch) => {
    const saved = await apiCreate(m);
    setMatches(prev => [...prev, saved]);
    return saved;
  };
  const deleteMatch = async (id: number) => {
    await apiDelete(id);
    setMatches(prev => prev.filter(m => m.id !== id));
  };
  const updateMatchScore = async (id: number, score: string, status: 'finished'|'live' = 'finished') => {
    await apiUpdate(id, score, status);
    setMatches(prev => prev.map(m => m.id === id ? { ...m, score, status } : m));
  };

  return { matches, loading, error, addMatch, deleteMatch, updateMatchScore };
};
