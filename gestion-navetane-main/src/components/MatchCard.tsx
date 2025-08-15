import { useState } from "react";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, MapPin, Calendar, Clock } from 'lucide-react';
import { Match } from '@/types/match';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Input } from '@/components/ui/input';

interface MatchCardProps {
  match: Match;
  onDelete: (id: string) => void;
  onUpdateScore: (id: string, score1: number, score2: number) => void;
}

export const MatchCard = ({ match, onDelete, onUpdateScore }: MatchCardProps) => {
  const [score1, setScore1] = useState(match.score1 ?? 0);
  const [score2, setScore2] = useState(match.score2 ?? 0);

  const getStatusVariant = (status: Match['status']) => {
    switch (status) {
      case 'upcoming': return 'secondary';
      case 'live': return 'destructive';
      case 'finished': return 'default';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: Match['status']) => {
    switch (status) {
      case 'upcoming': return 'À venir';
      case 'live': return 'En cours';
      case 'finished': return 'Terminé';
      default: return 'À venir';
    }
  };

  const formattedDate = format(new Date(match.date), 'EEEE dd MMMM yyyy', { locale: fr });

  return (
    <Card className="relative overflow-hidden shadow hover:shadow-lg transition-all duration-300 border">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-green-500"></div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Badge variant={getStatusVariant(match.status)}>
            {getStatusText(match.status)}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(match.id)}
            className="text-red-500 hover:bg-red-100"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center mb-4">
          <div className="flex items-center justify-center space-x-6">
            <div className="font-bold text-lg">{match.team1}</div>
            <div className="font-bold text-xl">
              {match.status === "finished" || match.status === "live" ? `${score1} - ${score2}` : "VS"}
            </div>
            <div className="font-bold text-lg">{match.team2}</div>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-green-500" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-yellow-500" />
            <span>{match.time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span>{match.location}</span>
          </div>
        </div>

        {match.status === "finished"  && (
          <div className="flex items-center space-x-2">
            <Input type="number" value={score1} onChange={(e) => setScore1(Number(e.target.value))} className="w-16"/>
            <span>-</span>
            <Input type="number" value={score2} onChange={(e) => setScore2(Number(e.target.value))} className="w-16"/>
            <Button onClick={() => onUpdateScore(match.id, score1, score2)}>Valider</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
