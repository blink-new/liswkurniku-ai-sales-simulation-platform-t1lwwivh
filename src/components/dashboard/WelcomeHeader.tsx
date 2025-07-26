import React from 'react';
import { User, Award, Globe } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface WelcomeHeaderProps {
  user: {
    name: string;
    level: number;
    stage: string;
    avatar?: string;
  };
  language: string;
  onLanguageChange: (language: string) => void;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  user,
  language,
  onLanguageChange
}) => {
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const currentLanguage = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-6">
        <div className="w-16 h-16 salesplay-card rounded-full flex items-center justify-center shadow-lg">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full" />
          ) : (
            <span className="text-salesplay-red font-serif font-semibold text-xl">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          )}
        </div>
        <div>
          <h1 className="text-4xl font-serif font-semibold text-white salesplay-title mb-2">
            Welcome back, {user.name.split(' ')[0]}
          </h1>
          <div className="flex items-center space-x-3">
            <Award className="w-5 h-5 text-white/90" />
            <span className="text-white/90 text-lg salesplay-subtitle">
              Level {user.level} – {user.stage}
            </span>
            <Badge className="bg-white/20 text-white border-white/30 ml-3">
              Active
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Globe className="w-5 h-5 text-white/90" />
        <div className="salesplay-button px-4 py-2 rounded-lg">
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-24 bg-transparent border-none text-white">
              <SelectValue>
                <span className="flex items-center gap-2">
                  {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-lg border-white/20">
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code} className="text-gray-800">
                  <span className="flex items-center gap-2">
                    {lang.flag} {lang.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};