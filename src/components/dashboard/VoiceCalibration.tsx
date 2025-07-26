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
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Voice calibration complete. You're ready for voice simulations!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <MicOff className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-orange-900">
              Voice Calibration Required
            </h3>
            <p className="text-sm text-orange-700 mt-1">
              Calibrate your microphone for optimal voice simulation experience.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={onTest}
              variant="outline" 
              size="sm"
              className="border-orange-300 text-orange-700 hover:bg-orange-100"
            >
              <Mic className="w-4 h-4 mr-2" />
              Test
            </Button>
            <Button 
              onClick={onCalibrate}
              size="sm"
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Settings className="w-4 h-4 mr-2" />
              Calibrate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};