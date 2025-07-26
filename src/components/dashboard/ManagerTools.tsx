import React from 'react';
import { Users, BarChart3, FileText, Plus, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

interface ManagerToolsProps {
  onScenarioBuilder: () => void;
  onTeamPerformance: () => void;
  onFeedbackReview: () => void;
  onUserManagement: () => void;
}

export const ManagerTools: React.FC<ManagerToolsProps> = ({
  onScenarioBuilder,
  onTeamPerformance,
  onFeedbackReview,
  onUserManagement
}) => {
  const tools = [
    {
      title: 'Scenario Builder',
      description: 'Create and customize training scenarios',
      icon: Plus,
      onClick: onScenarioBuilder,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/20'
    },
    {
      title: 'Team Performance',
      description: 'View team analytics and progress',
      icon: BarChart3,
      onClick: onTeamPerformance,
      color: 'text-green-600',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'Feedback Review',
      description: 'Review and manage team feedback',
      icon: FileText,
      onClick: onFeedbackReview,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/20'
    },
    {
      title: 'User Management',
      description: 'Manage team members and permissions',
      icon: Users,
      onClick: onUserManagement,
      color: 'text-orange-600',
      bgColor: 'bg-orange-500/20'
    }
  ];

  return (
    <div className="salesplay-card rounded-2xl p-6 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-salesplay-red/20 rounded-lg flex items-center justify-center">
          <Settings className="w-5 h-5 text-salesplay-red" />
        </div>
        <h3 className="text-xl font-serif font-semibold text-gray-800">Manager Tools</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {tools.map((tool) => (
          <Button
            key={tool.title}
            onClick={tool.onClick}
            variant="ghost"
            className="h-auto p-4 justify-start hover:bg-gray-50 rounded-xl transition-all duration-200 hover:shadow-md"
          >
            <div className={`w-12 h-12 rounded-xl ${tool.bgColor} flex items-center justify-center mr-4`}>
              <tool.icon className={`w-6 h-6 ${tool.color}`} />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900 text-base">{tool.title}</div>
              <div className="text-sm text-gray-600 mt-1">{tool.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};