import React from 'react';
import { Settings, Users, BarChart3, MessageSquare, Plus } from 'lucide-react';

interface TopToolbarProps {
  onNavigate: (page: string) => void;
}

export const TopToolbar: React.FC<TopToolbarProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border-b border-white/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <h1 className="text-white font-['Playfair_Display'] text-xl font-semibold">
            Liswkurniku
          </h1>
        </div>

        {/* Manager Tools */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('scenario-builder')}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-cyan-400 text-white rounded-lg hover:from-pink-600 hover:to-cyan-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium">Scenario Builder</span>
          </button>
          
          <button
            onClick={() => onNavigate('team-performance')}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-cyan-400 text-white rounded-lg hover:from-pink-600 hover:to-cyan-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="font-medium">Team Performance</span>
          </button>
          
          <button
            onClick={() => onNavigate('feedback-review')}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-cyan-400 text-white rounded-lg hover:from-pink-600 hover:to-cyan-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="font-medium">Feedback Review</span>
          </button>
          
          <button
            onClick={() => onNavigate('user-management')}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-cyan-400 text-white rounded-lg hover:from-pink-600 hover:to-cyan-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Users className="w-4 h-4" />
            <span className="font-medium">User Management</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => onNavigate('settings')}
            className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 backdrop-blur-sm"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopToolbar;