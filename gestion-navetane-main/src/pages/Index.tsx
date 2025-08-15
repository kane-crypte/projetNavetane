import { useState } from 'react';
import { useMatches } from '@/hooks/useMatches';
import { Header } from '@/components/Header';
import { AddMatchForm } from '@/components/AddMatchForm';
import { MatchCard } from '@/components/MatchCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Calendar, Trophy } from 'lucide-react';

const Index = () => {
  const { matches, addMatch, removeMatch } = useMatches(); // ← correction ici
  const [showAddForm, setShowAddForm] = useState(false);

  const upcomingMatches = matches.filter(match => match.status === 'upcoming');
  const finishedMatches = matches.filter(match => match.status === 'finished');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Add Match Section */}
        <div className="mb-8">
          {!showAddForm ? (
            <div className="text-center">
              <Button
                onClick={() => setShowAddForm(true)}
                size="lg"
                className="bg-gradient-to-r from-field-green to-gold hover:from-field-green-dark hover:to-gold-dark text-white font-medium shadow-[var(--shadow-gold)]"
              >
                <Plus className="h-5 w-5 mr-2" />
                Programmer un Nouveau Match
              </Button>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <AddMatchForm 
                onAddMatch={(match) => {
                  addMatch(match);
                  setShowAddForm(false);
                }} 
              />
              <div className="text-center mt-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowAddForm(false)}
                  className="text-muted-foreground"
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Matches List */}
        {matches.length === 0 ? (
          <Card className="max-w-md mx-auto text-center p-8 border-field-green/20">
            <CardContent className="space-y-4">
              <div className="bg-field-green/10 p-4 rounded-full w-fit mx-auto">
                <Trophy className="h-12 w-12 text-field-green" />
              </div>
              <h3 className="text-xl font-semibold text-primary">
                Aucun match programmé
              </h3>
              <p className="text-muted-foreground">
                Commencez par ajouter votre premier match de navétane !
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Upcoming Matches */}
            {upcomingMatches.length > 0 && (
              <section>
                <h2 className="flex items-center space-x-2 text-2xl font-bold text-primary mb-6">
                  <Calendar className="h-6 w-6 text-field-green" />
                  <span>Matchs à venir</span>
                  <span className="bg-field-green text-white text-sm px-2 py-1 rounded-full">
                    {upcomingMatches.length}
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingMatches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      onDelete={removeMatch} // ← correction ici
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Finished Matches */}
            {finishedMatches.length > 0 && (
              <section>
                <h2 className="flex items-center space-x-2 text-2xl font-bold text-primary mb-6">
                  <Trophy className="h-6 w-6 text-gold" />
                  <span>Matchs terminés</span>
                  <span className="bg-gold text-white text-sm px-2 py-1 rounded-full">
                    {finishedMatches.length}
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {finishedMatches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      onDelete={removeMatch} // ← correction ici aussi
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
