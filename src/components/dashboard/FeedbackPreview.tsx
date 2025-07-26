import React from 'react';
import { MessageSquare, TrendingUp, Eye, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface FeedbackPreviewProps {
  feedback: {
    sessionId: string;
    scenarioName: string;
    date: string;
    overallScore: number;
    scores: {
      communication: number;
      content: number;
      tone: number;
      persuasion: number;
    };
    aiComment: string;
    improvements: string[];
  };
  onViewFullReport: (sessionId: string) => void;
}

export const FeedbackPreview: React.FC<FeedbackPreviewProps> = ({
  feedback,
  onViewFullReport
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <span>Latest Feedback</span>
          </CardTitle>
          <Badge className={getScoreBadgeColor(feedback.overallScore)}>
            {feedback.overallScore}% Overall
          </Badge>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{feedback.scenarioName}</span>
          <span>{feedback.date}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Score Breakdown */}
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(feedback.scores).map(([category, score]) => (
            <div key={category} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium capitalize">
                {category}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span className={`text-sm font-semibold ${getScoreColor(score)}`}>
                  {score}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Comment */}
        <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-gray-700 italic">
            "{feedback.aiComment}"
          </p>
        </div>

        {/* Key Improvements */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900 flex items-center space-x-1">
            <TrendingUp className="w-4 h-4" />
            <span>Key Improvements</span>
          </h4>
          <ul className="space-y-1">
            {feedback.improvements.slice(0, 2).map((improvement, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button 
          onClick={() => onViewFullReport(feedback.sessionId)}
          variant="outline" 
          className="w-full"
          size="sm"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Full Report
        </Button>
      </CardContent>
    </Card>
  );
};