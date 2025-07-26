import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, CheckCircle, Clock, Globe, MessageSquare, Target, Users } from 'lucide-react';

interface ScenarioData {
  title: string;
  industry: string;
  clientPersona: string;
  market: string;
  language: string;
  communicationChannel: string;
  clientBehavior: string;
  objections: string;
  goal: string;
  difficulty: number;
}

interface PreviewPanelProps {
  data: ScenarioData;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ data }) => {
  // Calculate completion percentage
  const requiredFields = [
    'title', 'industry', 'clientPersona', 'market', 
    'language', 'communicationChannel', 'clientBehavior', 'goal'
  ];
  
  const completedFields = requiredFields.filter(field => 
    data[field as keyof ScenarioData] && 
    String(data[field as keyof ScenarioData]).trim() !== ''
  ).length;
  
  const completionPercentage = Math.round((completedFields / requiredFields.length) * 100);

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'Easy';
      case 2: return 'Medium';
      case 3: return 'Hard';
      default: return 'Easy';
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-100 text-green-800 border-green-200';
      case 2: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 3: return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIndustryIcon = (industry: string) => {
    switch (industry) {
      case 'medical': return '🏥';
      case 'logistics': return '🚚';
      case 'saas': return '💻';
      case 'finance': return '💰';
      case 'manufacturing': return '🏭';
      case 'retail': return '🛍️';
      case 'education': return '🎓';
      case 'real-estate': return '🏢';
      default: return '🏢';
    }
  };

  const getMarketFlag = (market: string) => {
    switch (market) {
      case 'poland': return '🇵🇱';
      case 'germany': return '🇩🇪';
      case 'usa': return '🇺🇸';
      case 'uk': return '🇬🇧';
      case 'france': return '🇫🇷';
      case 'netherlands': return '🇳🇱';
      default: return '🌍';
    }
  };

  return (
    <div className="sticky top-24">
      <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-serif font-semibold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-salesplay-red to-salesplay-orange rounded-lg">
              <Eye className="h-5 w-5 text-white" />
            </div>
            Live Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Completion Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Completion</span>
              <span className="text-sm font-bold text-salesplay-red">{completionPercentage}%</span>
            </div>
            <Progress 
              value={completionPercentage} 
              className="h-2 bg-gray-200"
            />
            <p className="text-xs text-gray-600">
              {completedFields} of {requiredFields.length} required fields completed
            </p>
          </div>

          {/* Scenario Title */}
          <div className="space-y-2">
            <h3 className="font-serif font-semibold text-gray-900">
              {data.title || 'Untitled Scenario'}
            </h3>
            {data.title && (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-xs">Title set</span>
              </div>
            )}
          </div>

          {/* Industry & Market */}
          {(data.industry || data.market) && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Context
              </h4>
              <div className="space-y-2">
                {data.industry && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getIndustryIcon(data.industry)}</span>
                    <span className="text-sm text-gray-600 capitalize">
                      {data.industry.replace('-', ' ')} Industry
                    </span>
                  </div>
                )}
                {data.market && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getMarketFlag(data.market)}</span>
                    <span className="text-sm text-gray-600 capitalize">
                      {data.market.replace('-', ' ')} Market
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Client Profile */}
          {data.clientPersona && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Client Profile
              </h4>
              <div className="p-3 bg-gradient-to-r from-salesplay-red/5 to-salesplay-orange/5 rounded-lg border border-salesplay-red/10">
                <p className="text-sm text-gray-700 font-medium">{data.clientPersona}</p>
                {data.clientBehavior && (
                  <p className="text-xs text-gray-600 mt-1 capitalize">
                    Behavior: {data.clientBehavior.replace('-', ' ')}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Communication Setup */}
          {(data.communicationChannel || data.language) && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Communication
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.communicationChannel && (
                  <Badge 
                    variant="outline" 
                    className="border-salesplay-red/30 text-salesplay-red bg-salesplay-red/5"
                  >
                    {data.communicationChannel.charAt(0).toUpperCase() + data.communicationChannel.slice(1)}
                  </Badge>
                )}
                {data.language && (
                  <Badge 
                    variant="outline" 
                    className="border-salesplay-orange/30 text-salesplay-orange bg-salesplay-orange/5"
                  >
                    {data.language}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Scenario Goal */}
          {data.goal && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Objective
              </h4>
              <div className="p-3 bg-gradient-to-r from-salesplay-orange/5 to-salesplay-red/5 rounded-lg border border-salesplay-orange/10">
                <p className="text-sm text-gray-700 font-medium capitalize">
                  {data.goal.replace('-', ' ')}
                </p>
              </div>
            </div>
          )}

          {/* Difficulty Level */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Difficulty
            </h4>
            <Badge 
              className={`${getDifficultyColor(data.difficulty)} border`}
            >
              {getDifficultyLabel(data.difficulty)}
            </Badge>
          </div>

          {/* Objections Preview */}
          {data.objections && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Key Objections</h4>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 line-clamp-3">
                  {data.objections}
                </p>
              </div>
            </div>
          )}

          {/* Completion Status */}
          <div className="pt-4 border-t border-gray-200">
            {completionPercentage === 100 ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Ready to save!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-amber-600">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {requiredFields.length - completedFields} fields remaining
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};