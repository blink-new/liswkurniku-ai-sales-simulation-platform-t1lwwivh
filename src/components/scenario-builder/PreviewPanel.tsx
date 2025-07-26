import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { Eye, CheckCircle, Clock, Globe, MessageSquare, Target } from 'lucide-react'

interface ScenarioData {
  title: string
  industry: string
  clientPersona: string
  market: string
  language: string
  communicationChannel: string
  clientBehavior: string
  objections: string
  goal: string
  difficulty: number
}

interface PreviewPanelProps {
  data: ScenarioData
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ data }) => {
  const getCompletionPercentage = () => {
    const fields = Object.values(data)
    const completedFields = fields.filter(field => 
      field !== undefined && field !== null && field.toString().trim() !== ''
    ).length
    return Math.round((completedFields / fields.length) * 100)
  }

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'Easy'
      case 2: return 'Medium'
      case 3: return 'Hard'
      default: return 'Easy'
    }
  }

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-100 text-green-800'
      case 2: return 'bg-yellow-100 text-yellow-800'
      case 3: return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const completionPercentage = getCompletionPercentage()

  return (
    <div className="space-y-6 sticky top-8">
      {/* Completion Progress */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-neon-gradient-subtle rounded-lg">
              <Eye className="h-5 w-5 text-neon-gradient" />
            </div>
            Live Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Completion</span>
              <span className="font-medium text-gray-900">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
          
          {completionPercentage === 100 && (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle className="h-4 w-4" />
              <span>Scenario ready to save!</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scenario Preview */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-medium text-gray-900">
            Scenario Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Title */}
          {data.title && (
            <div>
              <h3 className="font-medium text-gray-900 mb-1">
                {data.title}
              </h3>
              <p className="text-sm text-gray-600">
                {data.industry && `${data.industry} • `}
                {data.market && `${data.market}`}
              </p>
            </div>
          )}

          {/* Client Persona */}
          {data.clientPersona && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Target className="h-4 w-4" />
                <span>Client</span>
              </div>
              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                {data.clientPersona}
              </p>
            </div>
          )}

          {/* Communication & Language */}
          <div className="grid grid-cols-2 gap-3">
            {data.language && (
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Globe className="h-3 w-3" />
                  <span>Language</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {data.language}
                </Badge>
              </div>
            )}
            
            {data.communicationChannel && (
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <MessageSquare className="h-3 w-3" />
                  <span>Channel</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {data.communicationChannel}
                </Badge>
              </div>
            )}
          </div>

          {/* Behavior & Goal */}
          <div className="space-y-3">
            {data.clientBehavior && (
              <div className="space-y-1">
                <span className="text-xs text-gray-600">Client Behavior</span>
                <Badge variant="secondary" className="text-xs">
                  {data.clientBehavior}
                </Badge>
              </div>
            )}
            
            {data.goal && (
              <div className="space-y-1">
                <span className="text-xs text-gray-600">Scenario Goal</span>
                <Badge variant="secondary" className="text-xs">
                  {data.goal}
                </Badge>
              </div>
            )}
          </div>

          {/* Difficulty */}
          {data.difficulty && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Difficulty Level</span>
              </div>
              <Badge className={`text-xs ${getDifficultyColor(data.difficulty)}`}>
                {getDifficultyLabel(data.difficulty)}
              </Badge>
            </div>
          )}

          {/* Objections Preview */}
          {data.objections && (
            <div className="space-y-2">
              <span className="text-xs text-gray-600">Key Objections</span>
              <p className="text-xs text-gray-700 bg-gray-50 p-3 rounded-lg line-clamp-3">
                {data.objections}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}