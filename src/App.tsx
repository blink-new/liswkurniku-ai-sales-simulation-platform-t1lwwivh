import { useState } from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import { useAuth } from './hooks/useAuth'
import { Toaster } from './components/ui/sonner'
import { Dashboard } from './components/Dashboard'
import { ScenarioBuilder } from './components/ScenarioBuilder'
import { ConversationView } from './components/ConversationView'
import { TopToolbar } from './components/TopToolbar'

type Page = 'dashboard' | 'scenario-builder' | 'conversation' | 'team-performance' | 'feedback-review' | 'user-management' | 'settings'

function AppContent() {
  const { user, isLoading } = useAuth()
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-orange mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Liswkurniku...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neon-gradient-soft flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-neon-lg p-8 text-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-neon-gradient mb-2">Liswkurniku</h1>
              <p className="text-slate-600">AI Sales Simulation Platform</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-sm text-slate-600">
                <div className="w-2 h-2 bg-neon-gradient rounded-full mr-3"></div>
                AI-powered role-play simulations
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <div className="w-2 h-2 bg-neon-gradient rounded-full mr-3"></div>
                Voice and text conversation modes
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <div className="w-2 h-2 bg-neon-gradient rounded-full mr-3"></div>
                Personalized feedback and analytics
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <div className="w-2 h-2 bg-neon-gradient rounded-full mr-3"></div>
                Multilingual support (EN, PL, DE)
              </div>
            </div>

            <p className="text-slate-500 text-sm">
              Please sign in to access your sales training platform
            </p>
          </div>
        </div>
      </div>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="min-h-screen">
            <TopToolbar onNavigate={setCurrentPage} />
            <Dashboard onNavigate={setCurrentPage} />
          </div>
        )
      case 'scenario-builder':
        return (
          <div className="min-h-screen">
            <TopToolbar onNavigate={setCurrentPage} />
            <ScenarioBuilder onBack={() => setCurrentPage('dashboard')} />
          </div>
        )
      case 'conversation':
        return (
          <div className="min-h-screen">
            <TopToolbar onNavigate={setCurrentPage} />
            <ConversationView
              scenario={{
                title: "IT Director Meeting",
                clientPersona: "IT Director – Regional Hospital, Poland"
              }}
              onStartConversation={() => console.log('Starting conversation...')}
              onEndSimulation={() => setCurrentPage('dashboard')}
              onSendMessage={(message) => console.log('Sending message:', message)}
              onVoiceToggle={() => console.log('Voice toggle')}
              onBack={() => setCurrentPage('dashboard')}
            />
          </div>
        )
      case 'team-performance':
        return (
          <div className="min-h-screen">
            <TopToolbar onNavigate={setCurrentPage} />
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h1 className="text-3xl font-['Playfair_Display'] text-white mb-4">Team Performance</h1>
                  <p className="text-white/80">Team performance analytics coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        )
      case 'feedback-review':
        return (
          <div className="min-h-screen">
            <TopToolbar onNavigate={setCurrentPage} />
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h1 className="text-3xl font-['Playfair_Display'] text-white mb-4">Feedback Review</h1>
                  <p className="text-white/80">Feedback review system coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        )
      case 'user-management':
        return (
          <div className="min-h-screen">
            <TopToolbar onNavigate={setCurrentPage} />
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h1 className="text-3xl font-['Playfair_Display'] text-white mb-4">User Management</h1>
                  <p className="text-white/80">User management system coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="min-h-screen">
            <TopToolbar onNavigate={setCurrentPage} />
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h1 className="text-3xl font-['Playfair_Display'] text-white mb-4">Settings</h1>
                  <p className="text-white/80">Settings panel coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="min-h-screen">
            <TopToolbar onNavigate={setCurrentPage} />
            <Dashboard onNavigate={setCurrentPage} />
          </div>
        )
    }
  }

  return renderPage()
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
      <Toaster />
    </LanguageProvider>
  )
}

export default App