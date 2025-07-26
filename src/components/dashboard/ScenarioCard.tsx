import React from 'react';
import { Play, Eye, RotateCcw, Building, Star, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface ScenarioCardProps {
  scenario: {
    id: string;
    name: string;
    industry: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    lastAttempt?: {
      status: 'completed' | 'failed' | 'in-progress';
      score?: number;
      date: string;
    };
    duration: string;
    description: string;
  };
  onStart: (id: string) => void;
  onPreview: (id: string) => void;
  onRetry: (id: string) => void;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  onStart,
  onPreview,
  onRetry
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-blue-500" />
            <CardTitle className="text-lg">{scenario.name}</CardTitle>
          </div>
          <Badge className={getDifficultyColor(scenario.difficulty)}>
            {scenario.difficulty}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{scenario.industry}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700">{scenario.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{scenario.duration}</span>
          </div>
          {scenario.lastAttempt && (
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(scenario.lastAttempt.status)}>
                {scenario.lastAttempt.status}
              </Badge>
              {scenario.lastAttempt.score && (
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{scenario.lastAttempt.score}%</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={() => onStart(scenario.id)}
            className="flex-1"
            size="sm"
          >
            <Play className="w-4 h-4 mr-2" />
            Start
          </Button>
          <Button 
            onClick={() => onPreview(scenario.id)}
            variant="outline"
            size="sm"
          >
            <Eye className="w-4 h-4" />
          </Button>
          {scenario.lastAttempt && (
            <Button 
              onClick={() => onRetry(scenario.id)}
              variant="outline"
              size="sm"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};