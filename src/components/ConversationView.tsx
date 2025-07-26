import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Mic, MicOff, Play, Square, Volume2 } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface ConversationViewProps {
  scenario?: {
    title: string;
    clientPersona: string;
  };
  onBack?: () => void;
  onStartConversation?: () => void;
  onEndConversation?: () => void;
  onSendMessage?: (message: string) => void;
  onVoiceRecord?: (audioData: Blob) => void;
  messages?: Message[];
  isConversationActive?: boolean;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  scenario = {
    title: "Hospital IT Budget Discussion",
    clientPersona: "IT Director – Regional Hospital, Poland"
  },
  onBack = () => console.log('Back clicked'),
  onStartConversation = () => console.log('Start conversation'),
  onEndConversation = () => console.log('End conversation'),
  onSendMessage = (message: string) => console.log('Send message:', message),
  onVoiceRecord = (audioData: Blob) => console.log('Voice recorded:', audioData),
  messages = [],
  isConversationActive = false
}) => {
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLocalConversationActive, setIsLocalConversationActive] = useState(isConversationActive);
  const [recordingTime, setRecordingTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Demo AI responses for simulation
  const demoResponses = [
    "Hello! I'm Dr. Kowalski, IT Director at Regional Hospital Warsaw. I understand you wanted to discuss our IT infrastructure needs?",
    "That's interesting, but I have to be honest - our budget is quite tight this year. We've already allocated most of our funds to essential medical equipment.",
    "I see your point about efficiency, but how can you guarantee ROI? We've had bad experiences with IT vendors promising the world and delivering very little.",
    "The security aspect is crucial for us. We handle sensitive patient data. What certifications does your solution have?",
    "Let me think about this. Can you send me some case studies from similar hospitals? I'd need to present this to our board.",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      setRecordingTime(0);
    }

    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecording]);

  const handleStartConversation = () => {
    setIsLocalConversationActive(true);
    onStartConversation();
    
    // Add initial AI message
    setTimeout(() => {
      const initialMessage: Message = {
        role: 'ai',
        text: demoResponses[0],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setLocalMessages([initialMessage]);
    }, 1000);
  };

  const handleEndConversation = () => {
    setIsLocalConversationActive(false);
    onEndConversation();
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !isLocalConversationActive) return;

    const userMessage: Message = {
      role: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setLocalMessages(prev => [...prev, userMessage]);
    onSendMessage(inputMessage);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const responseIndex = Math.min(localMessages.length, demoResponses.length - 1);
      const aiMessage: Message = {
        role: 'ai',
        text: demoResponses[responseIndex] || "I understand. Let me think about that...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setLocalMessages(prev => [...prev, aiMessage]);
    }, 1500 + Math.random() * 2000);
  };

  const handleVoiceRecord = async () => {
    if (!isLocalConversationActive) return;

    if (isRecording) {
      setIsRecording(false);
      
      // Simulate voice-to-text conversion
      setTimeout(() => {
        const voiceMessage = "This is a simulated voice message converted to text.";
        const userMessage: Message = {
          role: 'user',
          text: voiceMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setLocalMessages(prev => [...prev, userMessage]);
        
        // Simulate AI response
        setTimeout(() => {
          const responseIndex = Math.min(localMessages.length, demoResponses.length - 1);
          const aiMessage: Message = {
            role: 'ai',
            text: demoResponses[responseIndex] || "I understand. Let me think about that...",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setLocalMessages(prev => [...prev, aiMessage]);
        }, 1500);
      }, 1000);
    } else {
      setIsRecording(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen bg-gradient-to-br from-salesplay-red to-salesplay-orange flex flex-col">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div>
              <h1 className="text-xl font-serif font-bold text-white">{scenario.title}</h1>
              <p className="text-white/80 text-sm">{scenario.clientPersona}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {!isLocalConversationActive ? (
              <button
                onClick={handleStartConversation}
                className="px-6 py-2 magenta-chromium-button rounded-lg"
              >
                <Play className="w-4 h-4 inline mr-2" />
                Start Conversation
              </button>
            ) : (
              <button
                onClick={handleEndConversation}
                className="px-6 py-2 magenta-chromium-button rounded-lg"
              >
                <Square className="w-4 h-4 inline mr-2" />
                End Simulation
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Conversation Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {!isLocalConversationActive ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <Volume2 className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-serif font-bold mb-2">Ready to Start</h2>
              <p className="text-white/80 mb-6 max-w-md">
                Click "Start Conversation" to begin your AI-powered sales simulation with {scenario.clientPersona}.
              </p>
              <button
                onClick={handleStartConversation}
                className="px-8 py-3 magenta-chromium-button rounded-lg text-lg"
              >
                <Play className="w-5 h-5 inline mr-2" />
                Start Conversation
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {localMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-white text-salesplay-red'
                      : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-salesplay-red/70' : 'text-white/70'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      {isLocalConversationActive && (
        <div className="bg-white/10 backdrop-blur-sm border-t border-white/20 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            
            <button
              onClick={handleVoiceRecord}
              className={`p-3 rounded-lg transition-colors ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="p-3 magenta-chromium-button rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {isRecording && (
            <div className="mt-3 flex items-center justify-center space-x-2 text-white">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Recording... {formatTime(recordingTime)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};