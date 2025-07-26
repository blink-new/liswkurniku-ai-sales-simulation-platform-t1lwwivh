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
    if (score >= 80) return 'bg-green-500/20 text-green-700 border-green-500/30';
    if (score >= 60) return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
    return 'bg-red-500/20 text-red-700 border-red-500/30';
  };

  return (
    <div className="salesplay-card rounded-2xl p-6 shadow-xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-salesplay-red/20 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-salesplay-red" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-gray-800">Latest Feedback</h3>
          </div>
          <Badge className={`${getScoreBadgeColor(feedback.overallScore)} border font-semibold px-3 py-1`}>
            {feedback.overallScore}% Overall
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-gray-700">{feedback.scenarioName}</span>
          <span className="text-gray-500">{feedback.date}</span>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(feedback.scores).map(([category, score]) => (
            <div key={category} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
              <span className="text-sm font-semibold text-gray-700 capitalize">
                {category}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className={`text-sm font-bold ${getScoreColor(score)}`}>
                  {score}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Comment */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-salesplay-red">
          <p className="text-gray-700 italic leading-relaxed">
            "{feedback.aiComment}"
          </p>
        </div>

        {/* Key Improvements */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-800 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-salesplay-red" />
            <span>Key Improvements</span>
          </h4>
          <ul className="space-y-2">
            {feedback.improvements.slice(0, 2).map((improvement, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start space-x-3">
                <div className="w-2 h-2 bg-salesplay-red rounded-full mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button 
          onClick={() => onViewFullReport(feedback.sessionId)}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-xl font-semibold py-3 transition-all duration-200"
          variant="outline"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Full Report
        </Button>
      </div>
    </div>
  );
};