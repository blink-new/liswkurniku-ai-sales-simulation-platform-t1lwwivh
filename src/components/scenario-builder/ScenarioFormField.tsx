import React from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Slider } from '../ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { HelpCircle } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface ScenarioFormFieldProps {
  label: string
  type: 'input' | 'textarea' | 'select' | 'radio' | 'slider'
  value: string | number | string[]
  onChange: (value: string | number | string[]) => void
  options?: Option[]
  placeholder?: string
  required?: boolean
  tooltip?: string
  error?: string
  min?: number
  max?: number
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
            className={error ? 'border-red-500' : ''}
          />
        )

      case 'textarea':
        return (
          <Textarea
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`min-h-[100px] ${error ? 'border-red-500' : ''}`}
          />
        )

      case 'select':
        return (
          <Select value={value as string} onValueChange={onChange}>
            <SelectTrigger className={error ? 'border-red-500' : ''}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case 'radio':
        return (
          <RadioGroup
            value={value as string}
            onValueChange={onChange}
            className="grid grid-cols-2 gap-4"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="text-sm font-normal">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )

      case 'slider':
        return (
          <div className="space-y-4">
            <Slider
              value={[value as number]}
              onValueChange={(values) => onChange(values[0])}
              min={min || 1}
              max={max || 3}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              {options.map((option, index) => (
                <span key={option.value} className={value === index + 1 ? 'font-medium text-neon-gradient' : ''}>
                  {option.label}
                </span>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      {renderField()}
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}