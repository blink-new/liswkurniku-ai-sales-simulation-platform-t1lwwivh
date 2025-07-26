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
      case 'Beginner': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-700 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'failed': return 'bg-red-500/20 text-red-700 border-red-500/30';
      case 'in-progress': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
    }
  };

  return (
    <div className="salesplay-card rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-salesplay-red/20 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-salesplay-red" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-semibold text-gray-800">{scenario.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{scenario.industry}</p>
            </div>
          </div>
          <Badge className={`${getDifficultyColor(scenario.difficulty)} border font-medium`}>
            {scenario.difficulty}
          </Badge>
        </div>
        
        <p className="text-gray-700 leading-relaxed">{scenario.description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{scenario.duration}</span>
          </div>
          {scenario.lastAttempt && (
            <div className="flex items-center space-x-3">
              <Badge className={`${getStatusColor(scenario.lastAttempt.status)} border font-medium`}>
                {scenario.lastAttempt.status}
              </Badge>
              {scenario.lastAttempt.score && (
                <div className="flex items-center space-x-1 text-yellow-600">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">{scenario.lastAttempt.score}%</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex space-x-3 pt-2">
          <Button 
            onClick={() => onStart(scenario.id)}
            className="flex-1 bg-salesplay-red hover:bg-salesplay-coral text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            size="sm"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Simulation
          </Button>
          <Button 
            onClick={() => onPreview(scenario.id)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-xl transition-all duration-200"
            variant="outline"
            size="sm"
          >
            <Eye className="w-4 h-4" />
          </Button>
          {scenario.lastAttempt && (
            <Button 
              onClick={() => onRetry(scenario.id)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-xl transition-all duration-200"
              variant="outline"
              size="sm"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};