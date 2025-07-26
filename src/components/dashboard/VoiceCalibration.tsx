import React from 'react';
import { Mic, MicOff, Settings, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';

interface VoiceCalibrationProps {
  isCalibrated: boolean;
  onCalibrate: () => void;
  onTest: () => void;
}

export const VoiceCalibration: React.FC<VoiceCalibrationProps> = ({
  isCalibrated,
  onCalibrate,
  onTest
}) => {
  if (isCalibrated) {
    return (
      <div className="salesplay-card rounded-2xl p-4 shadow-lg border-l-4 border-green-500">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-green-800">Voice Calibration Complete</h3>
            <p className="text-sm text-green-700">You're ready for voice simulations!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="salesplay-card rounded-2xl p-6 shadow-xl border-l-4 border-orange-500">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
            <MicOff className="w-6 h-6 text-orange-600" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-serif font-semibold text-orange-900 mb-1">
            Voice Calibration Required
          </h3>
          <p className="text-orange-700 leading-relaxed">
            Calibrate your microphone for optimal voice simulation experience.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            onClick={onTest}
            variant="outline" 
            className="border-orange-300 text-orange-700 hover:bg-orange-100 rounded-xl font-semibold"
          >
            <Mic className="w-4 h-4 mr-2" />
            Test
          </Button>
          <Button 
            onClick={onCalibrate}
            className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Settings className="w-4 h-4 mr-2" />
            Calibrate
          </Button>
        </div>
      </div>
    </div>
  );
};