import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Option {
  value: string;
  label: string;
}

interface ScenarioFormFieldProps {
  label: string;
  type: 'input' | 'textarea' | 'select' | 'radio' | 'slider';
  value: string | number | string[];
  onChange: (value: string | number | string[]) => void;
  options?: Option[];
  placeholder?: string;
  required?: boolean;
  tooltip?: string;
  error?: string;
  min?: number;
  max?: number;
}

export const ScenarioFormField: React.FC<ScenarioFormFieldProps> = ({
  label,
  type,
  value,
  onChange,
  options = [],
  placeholder,
  required = false,
  tooltip,
  error,
  min,
  max
}) => {
  const renderField = () => {
    switch (type) {
      case 'input':
        return (
          <Input
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`bg-white/50 border-gray-200 focus:border-salesplay-red focus:ring-salesplay-red/20 ${
              error ? 'border-red-500 focus:border-red-500' : ''
            }`}
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className={`bg-white/50 border-gray-200 focus:border-salesplay-red focus:ring-salesplay-red/20 resize-none ${
              error ? 'border-red-500 focus:border-red-500' : ''
            }`}
          />
        );

      case 'select':
        return (
          <Select value={value as string} onValueChange={onChange}>
            <SelectTrigger className={`bg-white/50 border-gray-200 focus:border-salesplay-red focus:ring-salesplay-red/20 ${
              error ? 'border-red-500' : ''
            }`}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {options.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="hover:bg-gradient-to-r hover:from-salesplay-red/10 hover:to-salesplay-orange/10"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'radio':
        return (
          <RadioGroup
            value={value as string}
            onValueChange={onChange}
            className="grid grid-cols-2 gap-4"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.value} 
                  id={option.value}
                  className="border-gray-300 text-salesplay-red focus:ring-salesplay-red"
                />
                <Label 
                  htmlFor={option.value} 
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'slider': {
        const sliderValue = Array.isArray(value) ? value : [value as number];
        return (
          <div className="space-y-4">
            <Slider
              value={sliderValue}
              onValueChange={(newValue) => onChange(newValue[0])}
              min={min || 1}
              max={max || 3}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              {options.map((option, index) => (
                <span 
                  key={option.value}
                  className={`font-medium ${
                    parseInt(option.value) === sliderValue[0] 
                      ? 'text-salesplay-red' 
                      : 'text-gray-500'
                  }`}
                >
                  {option.label}
                </span>
              ))}
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium text-gray-900">
          {label}
          {required && <span className="text-salesplay-red ml-1">*</span>}
        </Label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900 text-white border-gray-700 max-w-xs">
                <p className="text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      {renderField()}
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-600 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
};