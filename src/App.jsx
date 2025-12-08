import { useState, useEffect } from 'react'
import './App.css'
import Translator from './components/Translator'
import Settings from './components/Settings'
import { getLocale } from './locales'

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('subtitleTranslatorSettings')
    return saved ? JSON.parse(saved) : {
      apiKey: '',
      promptPattern: 'Translate the following subtitle text from {fromLang} to {toLang}. Maintain the original formatting, timing, and line breaks. Only return the translated text without any explanations:\n\n{text}',
      requestDelay: 5000,
      chunkSize: 50,
      locale: 'en'
    }
  })

  const t = getLocale(settings.locale)

  useEffect(() => {
    localStorage.setItem('subtitleTranslatorSettings', JSON.stringify(settings))
    document.dir = settings.locale === 'fa' ? 'rtl' : 'ltr'
  }, [settings])

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 {t.appTitle}</h1>
        <div className="header-buttons">
          <a 
            href={import.meta.env.VITE_DONATE_URL || 'https://reymit.ir/alifallahrn'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="donate-btn"
          >
            ❤️ {t.donateButton}
          </a>
          <button 
            className="settings-btn"
            onClick={() => setShowSettings(!showSettings)}
          >
            {showSettings ? `✕ ${t.closeButton}` : `⚙️ ${t.settingsButton}`}
          </button>
        </div>
      </header>
      
      {showSettings ? (
        <Settings settings={settings} setSettings={setSettings} t={t} />
      ) : (
        <Translator settings={settings} t={t} />
      )}
    </div>
  )
}

export default App
