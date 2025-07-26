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
  return (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
            ) : (
              <User className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome back, {user.name}
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <Award className="w-4 h-4 text-blue-500" />
              <span className="text-gray-600">
                Level {user.level} – {user.stage}
              </span>
              <Badge variant="secondary" className="ml-2">
                Active
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-gray-500" />
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="pl">PL</SelectItem>
              <SelectItem value="de">DE</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};