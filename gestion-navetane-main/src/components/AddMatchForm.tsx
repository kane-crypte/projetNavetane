import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { NewMatch } from '@/types/match';
import { useToast } from '@/hooks/use-toast';

interface AddMatchFormProps {
  onAddMatch: (match: NewMatch) => void;
}

export const AddMatchForm = ({ onAddMatch }: AddMatchFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<NewMatch>({
    team1: '',
    team2: '',
    date: '',
    time: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.team1 || !formData.team2 || !formData.date || !formData.time || !formData.location) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    onAddMatch(formData);
    
    // Reset form
    setFormData({
      team1: '',
      team2: '',
      date: '',
      time: '',
      location: ''
    });

    toast({
      title: "Match ajouté !",
      description: `Le match ${formData.team1} vs ${formData.team2} a été programmé.`,
    });
  };

  const handleChange = (field: keyof NewMatch) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <Card className="shadow-[var(--shadow-match-card)] border-gold/20">
      <CardHeader className="bg-gradient-to-r from-field-green/5 to-gold/5">
        <CardTitle className="flex items-center space-x-2 text-primary">
          <Plus className="h-5 w-5" />
          <span>Nouveau Match</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Teams */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="team1" className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-field-green" />
                <span>Équipe 1</span>
              </Label>
              <Input
                id="team1"
                value={formData.team1}
                onChange={handleChange('team1')}
                placeholder="Nom de l'équipe 1"
                className="border-field-green/30 focus:border-field-green"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="team2" className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-field-green" />
                <span>Équipe 2</span>
              </Label>
              <Input
                id="team2"
                value={formData.team2}
                onChange={handleChange('team2')}
                placeholder="Nom de l'équipe 2"
                className="border-field-green/30 focus:border-field-green"
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gold" />
                <span>Date</span>
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={handleChange('date')}
                className="border-gold/30 focus:border-gold"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gold" />
                <span>Heure</span>
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={handleChange('time')}
                className="border-gold/30 focus:border-gold"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Lieu</span>
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={handleChange('location')}
              placeholder="Terrain de jeu"
              className="border-primary/30 focus:border-primary"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-field-green to-gold hover:from-field-green-dark hover:to-gold-dark text-white font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Programmer le Match
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};