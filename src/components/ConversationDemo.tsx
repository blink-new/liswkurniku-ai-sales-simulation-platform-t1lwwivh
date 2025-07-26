import React, { useState } from 'react'
import ConversationView from './ConversationView'

interface Message {
  role: 'user' | 'ai'
  text: string
  timestamp: string
}

const ConversationDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isConversationActive, setIsConversationActive] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  const scenario = {
    title: "Enterprise Software Sales",
    clientPersona: "IT Director – Hospital, Poland"
  }

  const handleStartConversation = () => {
    setIsConversationActive(true)
    // Add initial AI greeting
    const welcomeMessage: Message = {
      role: 'ai',
      text: "Hello! I'm the IT Director at Regional Hospital in Warsaw. I understand you wanted to discuss our software needs. I have about 15 minutes - what can you tell me about your solution?",
      timestamp: new Date().toISOString()
    }
    setMessages([welcomeMessage])
  }

  const handleEndSimulation = () => {
    setIsConversationActive(false)
    setIsRecording(false)
    // Could trigger feedback view here
    console.log('Simulation ended. Messages:', messages)
  }

  const handleSendMessage = (messageText: string) => {
    const userMessage: Message = {
      role: 'user',
      text: messageText,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, userMessage])

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponses = [
        "That's interesting. Can you tell me more about the security features? We handle sensitive patient data.",
        "How does this compare to our current system? We're using an older solution that's becoming problematic.",
        "What about integration with our existing hospital management system? That's crucial for us.",
        "I'm concerned about the implementation timeline. We can't afford significant downtime.",
        "The pricing sounds reasonable, but I need to understand the total cost of ownership better.",
        "Can you provide some references from other hospitals that have implemented this solution?"
      ]
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      
      const aiMessage: Message = {
        role: 'ai',
        text: randomResponse,
        timestamp: new Date().toISOString()
      }
      
      setMessages(prev => [...prev, aiMessage])
    }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
  }

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording)
    
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false)
        // Simulate voice-to-text result
        const voiceMessages = [
          "Thank you for your time. Our solution offers enterprise-grade security with end-to-end encryption.",
          "We specialize in healthcare IT and have worked with over 200 hospitals across Europe.",
          "I understand your concerns about integration. Our platform has pre-built connectors for most hospital systems.",
          "We can implement this in phases to minimize disruption to your operations."
        ]
        const randomVoiceMessage = voiceMessages[Math.floor(Math.random() * voiceMessages.length)]
        handleSendMessage(randomVoiceMessage)
      }, 2000 + Math.random() * 3000) // Simulate 2-5 second recording
    }
  }

  return (
    <div className="h-screen">
      <ConversationView
        scenario={scenario}
        messages={messages}
        onSendMessage={handleSendMessage}
        onStartConversation={handleStartConversation}
        onEndSimulation={handleEndSimulation}
        onVoiceToggle={handleVoiceToggle}
        isRecording={isRecording}
        isConversationActive={isConversationActive}
      />
    </div>
  )
}

export default ConversationDemo