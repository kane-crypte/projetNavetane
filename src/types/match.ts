export interface Match {
  id: string;
  team1: string;
  team2: string;
  date: string;
  time: string;
  location: string;
  score?: {
    team1: number;
    team2: number;
  };
  status: 'upcoming' | 'live' | 'finished';
  createdAt: string;
}

export interface NewMatch {
  team1: string;
  team2: string;
  date: string;
  time: string;
  location: string;
}