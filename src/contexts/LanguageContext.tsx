import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'pl' | 'de'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation keys - in a real app, these would be loaded from files
const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.practice': 'Practice',
    'nav.progress': 'Progress',
    'nav.scenarios': 'Scenarios',
    'nav.team': 'Team',
    'nav.analytics': 'Analytics',
    'nav.settings': 'Settings',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.startSession': 'Start New Session',
    'dashboard.recentSessions': 'Recent Sessions',
    'dashboard.progress': 'Your Progress',
    'dashboard.scenarios': 'Available Scenarios',
    
    // Session
    'session.start': 'Start Session',
    'session.end': 'End Session',
    'session.pause': 'Pause',
    'session.resume': 'Resume',
    'session.voice': 'Voice Mode',
    'session.text': 'Text Mode',
    'session.recording': 'Recording...',
    'session.listening': 'Listening...',
    
    // Feedback
    'feedback.overall': 'Overall Score',
    'feedback.communication': 'Communication',
    'feedback.content': 'Content',
    'feedback.tone': 'Tone',
    'feedback.persuasion': 'Persuasion',
    'feedback.improvements': 'Areas for Improvement',
    'feedback.strengths': 'Strengths',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.create': 'Create',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.finish': 'Finish'
  },
  pl: {
    // Navigation
    'nav.dashboard': 'Panel główny',
    'nav.practice': 'Praktyka',
    'nav.progress': 'Postęp',
    'nav.scenarios': 'Scenariusze',
    'nav.team': 'Zespół',
    'nav.analytics': 'Analityka',
    'nav.settings': 'Ustawienia',
    
    // Dashboard
    'dashboard.welcome': 'Witaj ponownie',
    'dashboard.startSession': 'Rozpocznij nową sesję',
    'dashboard.recentSessions': 'Ostatnie sesje',
    'dashboard.progress': 'Twój postęp',
    'dashboard.scenarios': 'Dostępne scenariusze',
    
    // Session
    'session.start': 'Rozpocznij sesję',
    'session.end': 'Zakończ sesję',
    'session.pause': 'Pauza',
    'session.resume': 'Wznów',
    'session.voice': 'Tryb głosowy',
    'session.text': 'Tryb tekstowy',
    'session.recording': 'Nagrywanie...',
    'session.listening': 'Słucham...',
    
    // Feedback
    'feedback.overall': 'Wynik ogólny',
    'feedback.communication': 'Komunikacja',
    'feedback.content': 'Treść',
    'feedback.tone': 'Ton',
    'feedback.persuasion': 'Perswazja',
    'feedback.improvements': 'Obszary do poprawy',
    'feedback.strengths': 'Mocne strony',
    
    // Common
    'common.loading': 'Ładowanie...',
    'common.error': 'Błąd',
    'common.save': 'Zapisz',
    'common.cancel': 'Anuluj',
    'common.delete': 'Usuń',
    'common.edit': 'Edytuj',
    'common.create': 'Utwórz',
    'common.back': 'Wstecz',
    'common.next': 'Dalej',
    'common.finish': 'Zakończ'
  },
  de: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.practice': 'Übung',
    'nav.progress': 'Fortschritt',
    'nav.scenarios': 'Szenarien',
    'nav.team': 'Team',
    'nav.analytics': 'Analytik',
    'nav.settings': 'Einstellungen',
    
    // Dashboard
    'dashboard.welcome': 'Willkommen zurück',
    'dashboard.startSession': 'Neue Sitzung starten',
    'dashboard.recentSessions': 'Letzte Sitzungen',
    'dashboard.progress': 'Ihr Fortschritt',
    'dashboard.scenarios': 'Verfügbare Szenarien',
    
    // Session
    'session.start': 'Sitzung starten',
    'session.end': 'Sitzung beenden',
    'session.pause': 'Pause',
    'session.resume': 'Fortsetzen',
    'session.voice': 'Sprachmodus',
    'session.text': 'Textmodus',
    'session.recording': 'Aufnahme...',
    'session.listening': 'Zuhören...',
    
    // Feedback
    'feedback.overall': 'Gesamtbewertung',
    'feedback.communication': 'Kommunikation',
    'feedback.content': 'Inhalt',
    'feedback.tone': 'Ton',
    'feedback.persuasion': 'Überzeugung',
    'feedback.improvements': 'Verbesserungsbereiche',
    'feedback.strengths': 'Stärken',
    
    // Common
    'common.loading': 'Laden...',
    'common.error': 'Fehler',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.delete': 'Löschen',
    'common.edit': 'Bearbeiten',
    'common.create': 'Erstellen',
    'common.back': 'Zurück',
    'common.next': 'Weiter',
    'common.finish': 'Fertig'
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Get language from localStorage or browser preference
    const saved = localStorage.getItem('language') as Language
    if (saved && ['en', 'pl', 'de'].includes(saved)) {
      return saved
    }
    
    // Detect browser language
    const browserLang = navigator.language.split('-')[0]
    if (['en', 'pl', 'de'].includes(browserLang)) {
      return browserLang as Language
    }
    
    return 'en' // Default fallback
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}