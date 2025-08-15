import { Trophy, Calendar } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-field-green via-primary to-field-green-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="bg-white/10 p-3 rounded-full">
            <Trophy className="h-8 w-8 text-gold" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">
              Gestion Navétane
            </h1>
            <p className="text-field-green-light mt-2 flex items-center justify-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Organisation des tournois de football</span>
            </p>
          </div>
          <div className="bg-white/10 p-3 rounded-full">
            <Trophy className="h-8 w-8 text-gold" />
          </div>
        </div>
      </div>
    </header>
  );
};