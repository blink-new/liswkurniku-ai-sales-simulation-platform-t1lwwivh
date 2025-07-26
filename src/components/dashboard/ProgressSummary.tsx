import React from 'react';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';

interface ProgressSummaryProps {
  progress: {
    currentLevel: number;
    nextLevel: number;
    progressToNext: number;
    weeklyStats: {
      sessionsCompleted: number;
      successRate: number;
      totalMinutes: number;
      streak: number;
    };
    skillBreakdown: {
      communication: number;
      persuasion: number;
      objectionHandling: number;
      closing: number;
    };
  };
}

export const ProgressSummary: React.FC<ProgressSummaryProps> = ({ progress }) => {
  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <div className="salesplay-card rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-salesplay-red/20 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-salesplay-red" />
          </div>
          <h3 className="text-xl font-serif font-semibold text-gray-800">Level Progress</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Level {progress.currentLevel}</span>
            <span className="text-sm text-gray-500">Level {progress.nextLevel}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-salesplay-red to-salesplay-orange h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress.progressToNext}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 font-medium">
            {progress.progressToNext}% to next level
          </p>
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="salesplay-card rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-salesplay-red/20 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-salesplay-red" />
          </div>
          <h3 className="text-xl font-serif font-semibold text-gray-800">This Week</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {progress.weeklyStats.sessionsCompleted}
            </div>
            <div className="text-sm text-blue-700 font-medium">Sessions</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {progress.weeklyStats.successRate}%
            </div>
            <div className="text-sm text-green-700 font-medium">Success Rate</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {progress.weeklyStats.totalMinutes}
            </div>
            <div className="text-sm text-purple-700 font-medium">Minutes</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {progress.weeklyStats.streak}
            </div>
            <div className="text-sm text-orange-700 font-medium">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Skill Breakdown */}
      <div className="salesplay-card rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-salesplay-red/20 rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5 text-salesplay-red" />
          </div>
          <h3 className="text-xl font-serif font-semibold text-gray-800">Skill Breakdown</h3>
        </div>
        <div className="space-y-5">
          {Object.entries(progress.skillBreakdown).map(([skill, value]) => (
            <div key={skill} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 capitalize">
                  {skill.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-sm font-bold text-gray-600">{value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-salesplay-red to-salesplay-orange h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};