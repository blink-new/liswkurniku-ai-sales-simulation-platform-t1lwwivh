import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScenarioFormField } from './scenario-builder/ScenarioFormField';
import { PreviewPanel } from './scenario-builder/PreviewPanel';
import { ArrowLeft, Save, X, Clipboard, Globe, MessageSquare, Target, Users, AlertTriangle, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScenarioData {
  title: string;
  industry: string;
  clientPersona: string;
  market: string;
  language: string;
  communicationChannel: string;
  clientBehavior: string;
  objections: string;
  goal: string;
  difficulty: number;
}

interface FormErrors {
  [key: string]: string;
}

interface ScenarioBuilderProps {
  onBack: () => void
}

export const ScenarioBuilder: React.FC<ScenarioBuilderProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ScenarioData>({
    title: '',
    industry: '',
    clientPersona: '',
    market: '',
    language: '',
    communicationChannel: '',
    clientBehavior: '',
    objections: '',
    goal: '',
    difficulty: 1
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const industryOptions = [
    { value: 'medical', label: 'Medical & Healthcare' },
    { value: 'logistics', label: 'Logistics & Supply Chain' },
    { value: 'saas', label: 'SaaS & Technology' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'education', label: 'Education' },
    { value: 'real-estate', label: 'Real Estate' }
  ];

  const marketOptions = [
    { value: 'poland', label: 'Poland' },
    { value: 'germany', label: 'Germany' },
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'france', label: 'France' },
    { value: 'netherlands', label: 'Netherlands' }
  ];

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'polish', label: 'Polish' },
    { value: 'german', label: 'German' }
  ];

  const channelOptions = [
    { value: 'text', label: 'Text Chat' },
    { value: 'voice', label: 'Voice Call' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'video', label: 'Video Call' }
  ];

  const behaviorOptions = [
    { value: 'open', label: 'Open & Friendly' },
    { value: 'skeptical', label: 'Skeptical' },
    { value: 'dominant', label: 'Dominant' },
    { value: 'curious', label: 'Curious' },
    { value: 'passive', label: 'Passive' }
  ];

  const goalOptions = [
    { value: 'discovery', label: 'Discovery Call' },
    { value: 'demo', label: 'Product Demo' },
    { value: 'objection-handling', label: 'Objection Handling' },
    { value: 'closing', label: 'Deal Closing' }
  ];

  const difficultyOptions = [
    { value: '1', label: 'Easy' },
    { value: '2', label: 'Medium' },
    { value: '3', label: 'Hard' }
  ];

  const handleFieldChange = (field: keyof ScenarioData, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Scenario title is required';
    if (!formData.industry) newErrors.industry = 'Industry selection is required';
    if (!formData.clientPersona.trim()) newErrors.clientPersona = 'Client persona is required';
    if (!formData.market) newErrors.market = 'Market selection is required';
    if (!formData.language) newErrors.language = 'Language selection is required';
    if (!formData.communicationChannel) newErrors.communicationChannel = 'Communication channel is required';
    if (!formData.clientBehavior) newErrors.clientBehavior = 'Client behavior preset is required';
    if (!formData.goal) newErrors.goal = 'Scenario goal is required';

    if (formData.title.length > 100) newErrors.title = 'Title must be less than 100 characters';
    if (formData.clientPersona.length > 200) newErrors.clientPersona = 'Client persona must be less than 200 characters';
    if (formData.objections.length > 1000) newErrors.objections = 'Objections must be less than 1000 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before saving.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const payload = {
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'draft'
      };

      console.log('Scenario saved:', payload);
      
      toast({
        title: "Scenario Saved!",
        description: `"${formData.title}" has been saved successfully.`,
        variant: "default"
      });

      // Reset form or redirect
      // setFormData({ ... }); // Reset if needed
      
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "There was an error saving your scenario. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (Object.values(formData).some(value => value && value.toString().trim())) {
      if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
        onBack();
      }
    } else {
      onBack();
    }
  };

  const formSections = [
    {
      title: 'Basic Information',
      icon: Clipboard,
      fields: [
        {
          key: 'title' as keyof ScenarioData,
          label: 'Scenario Title',
          type: 'input' as const,
          placeholder: 'e.g., "Hospital IT Budget Discussion"',
          required: true,
          tooltip: 'A clear, descriptive name for this simulation scenario'
        },
        {
          key: 'industry' as keyof ScenarioData,
          label: 'Industry',
          type: 'select' as const,
          options: industryOptions,
          placeholder: 'Select industry',
          required: true,
          tooltip: 'The industry context for this sales scenario'
        }
      ]
    },
    {
      title: 'Client Profile',
      icon: Users,
      fields: [
        {
          key: 'clientPersona' as keyof ScenarioData,
          label: 'Client Persona',
          type: 'input' as const,
          placeholder: 'e.g., "IT Director, Regional Hospital"',
          required: true,
          tooltip: 'Describe the client\'s role, company type, and key characteristics'
        },
        {
          key: 'market' as keyof ScenarioData,
          label: 'Market / Region',
          type: 'select' as const,
          options: marketOptions,
          placeholder: 'Select market',
          required: true,
          tooltip: 'The geographical market where this scenario takes place'
        },
        {
          key: 'language' as keyof ScenarioData,
          label: 'Language',
          type: 'select' as const,
          options: languageOptions,
          placeholder: 'Select language',
          required: true,
          tooltip: 'The language for the simulation conversation'
        }
      ]
    },
    {
      title: 'Communication Setup',
      icon: MessageSquare,
      fields: [
        {
          key: 'communicationChannel' as keyof ScenarioData,
          label: 'Communication Channel',
          type: 'radio' as const,
          options: channelOptions,
          required: true,
          tooltip: 'How the sales conversation will take place'
        }
      ]
    },
    {
      title: 'Scenario Configuration',
      icon: Settings,
      fields: [
        {
          key: 'clientBehavior' as keyof ScenarioData,
          label: 'Client Behavior Preset',
          type: 'select' as const,
          options: behaviorOptions,
          placeholder: 'Select behavior',
          required: true,
          tooltip: 'The AI client\'s personality and communication style during the simulation'
        },
        {
          key: 'goal' as keyof ScenarioData,
          label: 'Goal of the Scenario',
          type: 'select' as const,
          options: goalOptions,
          placeholder: 'Select goal',
          required: true,
          tooltip: 'The primary objective or outcome this scenario is designed to practice'
        },
        {
          key: 'difficulty' as keyof ScenarioData,
          label: 'Difficulty Level',
          type: 'slider' as const,
          options: difficultyOptions,
          tooltip: 'How challenging this scenario should be for the sales professional'
        }
      ]
    },
    {
      title: 'Objections & Challenges',
      icon: AlertTriangle,
      fields: [
        {
          key: 'objections' as keyof ScenarioData,
          label: 'Common Objections to Simulate',
          type: 'textarea' as const,
          placeholder: 'e.g., "Budget constraints, security concerns, integration complexity..."',
          tooltip: 'List the typical objections or challenges the AI client should present during the conversation'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-salesplay-red to-salesplay-orange">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-serif font-bold text-white">Scenario Builder</h1>
                <p className="text-sm text-white/80">Create a new sales simulation scenario</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="border-white/30 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={isSubmitting}
                className="bg-white text-salesplay-red hover:bg-white/90 font-medium"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Scenario'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {formSections.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-serif font-semibold text-gray-900 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-salesplay-red to-salesplay-orange rounded-lg">
                      <section.icon className="h-5 w-5 text-white" />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.fields.map((field) => (
                    <ScenarioFormField
                      key={field.key}
                      label={field.label}
                      type={field.type}
                      value={formData[field.key]}
                      onChange={(value) => handleFieldChange(field.key, value)}
                      options={field.options}
                      placeholder={field.placeholder}
                      required={field.required}
                      tooltip={field.tooltip}
                      error={errors[field.key]}
                      min={field.key === 'difficulty' ? 1 : undefined}
                      max={field.key === 'difficulty' ? 3 : undefined}
                    />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <PreviewPanel data={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};