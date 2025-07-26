import React, { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'
import { Mic, Send, Phone, PhoneOff, ArrowLeft } from 'lucide-react'

interface Message {
  role: 'user' | 'ai'
  text: string
  timestamp: string
}

interface ConversationViewProps {
  scenario?: {
    title: string
    clientPersona: string
  }
  messages?: Message[]
  onSendMessage?: (message: string) => void
  onStartConversation?: () => void
  onEndSimulation?: () => void
  onVoiceToggle?: () => void
  isRecording?: boolean
  isConversationActive?: boolean
  onBack?: () => void
}

const ConversationView: React.FC<ConversationViewProps> = ({
  scenario = {
    title: "Enterprise Software Sales",
    clientPersona: "IT Director – Hospital, Poland"
  },
  messages = [],
  onSendMessage,
  onStartConversation,
  onEndSimulation,
  onVoiceToggle,
  isRecording = false,
  isConversationActive = false,
  onBack
}) => {
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when conversation starts
  useEffect(() => {
    if (isConversationActive && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isConversationActive])

  const handleSendMessage = () => {
    if (inputMessage.trim() && onSendMessage) {
      onSendMessage(inputMessage.trim())
      setInputMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <div>
              <h1 className="text-xl font-semibold text-slate-900 mb-1">
                {scenario.title}
              </h1>
              <p className="text-sm text-slate-600">
                Client: {scenario.clientPersona}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {!isConversationActive ? (
              <Button 
                onClick={onStartConversation}
                className="bg-neon-gradient hover:opacity-90 text-white px-6"
              >
                <Phone className="w-4 h-4 mr-2" />
                Start Conversation
              </Button>
            ) : (
              <Button 
                onClick={onEndSimulation}
                variant="destructive"
                className="px-6"
              >
                <PhoneOff className="w-4 h-4 mr-2" />
                End Simulation
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Conversation Area */}
      <div className="flex-1 overflow-hidden">
        {!isConversationActive && messages.length === 0 ? (
          // Welcome State
          <div className="flex items-center justify-center h-full">
            <Card className="p-8 max-w-md text-center bg-white shadow-sm">
              <div className="w-16 h-16 bg-neon-gradient-soft rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-neon-gradient" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Ready to Practice
              </h3>
              <p className="text-slate-600 mb-6">
                Click "Start Conversation" to begin your sales simulation with the AI client.
              </p>
              <Button 
                onClick={onStartConversation}
                className="bg-neon-gradient hover:opacity-90 text-white w-full"
              >
                Start Conversation
              </Button>
            </Card>
          </div>
        ) : (
          // Messages Area
          <div className="h-full overflow-y-auto px-6 py-4">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${
                      message.role === 'user'
                        ? 'bg-neon-gradient text-white'
                        : 'bg-white text-slate-900 border border-slate-200'
                    } rounded-2xl px-4 py-3 shadow-sm`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                    <p
                      className={`text-xs mt-2 ${
                        message.role === 'user'
                          ? 'text-white/70'
                          : 'text-slate-500'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      {isConversationActive && (
        <div className="bg-white border-t border-slate-200 px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-3">
              {/* Voice Button */}
              <Button
                onClick={onVoiceToggle}
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                className={`flex-shrink-0 h-12 w-12 rounded-full ${
                  isRecording 
                    ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' 
                    : 'border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Mic className="w-5 h-5" />
              </Button>

              {/* Text Input */}
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="pr-12 h-12 text-base border-slate-300 focus:border-neon-orange focus:ring-neon-orange rounded-xl"
                  disabled={isRecording}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isRecording}
                  size="icon"
                  className="absolute right-1 top-1 h-10 w-10 bg-neon-gradient hover:opacity-90 text-white rounded-lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Recording Indicator */}
            {isRecording && (
              <div className="flex items-center justify-center mt-3">
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  Recording... Speak now
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export { ConversationView }
export default ConversationView