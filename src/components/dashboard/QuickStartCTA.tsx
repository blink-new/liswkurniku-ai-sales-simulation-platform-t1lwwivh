import React from 'react';
import { Play, Zap } from 'lucide-react';
import { Button } from '../ui/button';

interface QuickStartCTAProps {
  onStartSimulation: () => void;
  isFloating?: boolean;
}

export const QuickStartCTA: React.FC<QuickStartCTAProps> = ({
  onStartSimulation,
  isFloating = false
}) => {
  if (isFloating) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onStartSimulation}
          size="lg"
          className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 bg-blue-600 hover:bg-blue-700"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Simulation
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2">Ready to Practice?</h3>
          <p className="text-blue-100">
            Start a new simulation and improve your sales skills with AI-powered training.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={onStartSimulation}
            variant="secondary"
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <Zap className="w-5 h-5 mr-2" />
            Quick Start
          </Button>
        </div>
      </div>
    </div>
  );
};