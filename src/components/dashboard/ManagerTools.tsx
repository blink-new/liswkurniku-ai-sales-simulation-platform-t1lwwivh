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
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Team Performance',
      description: 'View team analytics and progress',
      icon: BarChart3,
      onClick: onTeamPerformance,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Feedback Review',
      description: 'Review and manage team feedback',
      icon: FileText,
      onClick: onFeedbackReview,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'User Management',
      description: 'Manage team members and permissions',
      icon: Users,
      onClick: onUserManagement,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-gray-600" />
          <span>Manager Tools</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tools.map((tool) => (
            <Button
              key={tool.title}
              onClick={tool.onClick}
              variant="ghost"
              className="h-auto p-4 justify-start hover:bg-gray-50"
            >
              <div className={`w-10 h-10 rounded-lg ${tool.bgColor} flex items-center justify-center mr-3`}>
                <tool.icon className={`w-5 h-5 ${tool.color}`} />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">{tool.title}</div>
                <div className="text-sm text-gray-500">{tool.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};