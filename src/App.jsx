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
            href="https://github.com/alifallahrn/subtitle-translator"
            target="_blank" 
            rel="noopener noreferrer"
            className="github-btn"
            title="View on GitHub"
          >
            <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>
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

      <footer className="app-footer">
        <p>
          Made with <span className="heart">❤️</span> by{' '}
          <a 
            href="https://github.com/alifallahrn" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Ali Fallah
          </a>
        </p>
        <a 
          href="https://github.com/alifallahrn/subtitle-translator"
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-github"
        >
          <svg height="18" width="18" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          GitHub
        </a>
      </footer>
    </div>
  )
}

export default App
