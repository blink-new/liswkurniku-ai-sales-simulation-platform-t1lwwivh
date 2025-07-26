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
          className="salesplay-button-primary rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 px-6 py-4"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Simulation
        </Button>
      </div>
    );
  }

  return (
    <div className="salesplay-card rounded-2xl p-8 shadow-xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-salesplay-red/10 to-salesplay-orange/10 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-salesplay-orange/10 to-salesplay-red/10 rounded-full translate-y-12 -translate-x-12" />
      
      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-3">
            Ready to Practice?
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Start a new simulation and improve your sales skills with AI-powered training.
          </p>
        </div>
        <div className="ml-8">
          <Button
            onClick={onStartSimulation}
            size="lg"
            className="bg-salesplay-red hover:bg-salesplay-coral text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <Zap className="w-5 h-5 mr-3" />
            Quick Start
          </Button>
        </div>
      </div>
    </div>
  );
};