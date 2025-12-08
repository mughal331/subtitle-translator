import { useState } from 'react'
import './Settings.css'
import { availableLanguages } from '../locales'

function Settings({ settings, setSettings, t }) {
  const [formData, setFormData] = useState(settings)

  const handleSave = () => {
    setSettings(formData)
    alert(t.settingsSaved)
  }

  const handleReset = () => {
    const defaultSettings = {
      apiKey: '',
      promptPattern: 'Translate the following subtitle text from {fromLang} to {toLang}. Maintain the original formatting, timing, and line breaks. Only return the translated text without any explanations:\n\n{text}',
      requestDelay: 1000,
      chunkSize: 5,
      locale: 'en'
    }
    setFormData(defaultSettings)
  }

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h2>⚙️ {t.settingsTitle}</h2>
        
        <div className="form-group">
          <label>
            🔑 {t.apiKeyLabel}
            <span className="required">{t.required}</span>
          </label>
          <input
            type="password"
            value={formData.apiKey}
            onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
            placeholder={t.apiKeyPlaceholder}
            className="input-field"
          />
          
          {/* Helpful Instructions */}
          <div className="api-key-instructions">
            <p className="instructions-title">📖 {t.apiKeyInstructions}</p>
            <ol className="instructions-list">
              <li>
                {t.apiKeyStep1} <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="link-primary">
                  {t.googleAiStudio}
                </a>
              </li>
              <li>{t.apiKeyStep2}</li>
              <li>{t.apiKeyStep3}</li>
              <li>{t.apiKeyStep4}</li>
            </ol>
            <div className="security-note">
              <p>{t.apiKeySecurity}</p>
              <p className="note-text">{t.apiKeyNote}</p>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>
            🌐 {t.languageLabel}
          </label>
          <select
            value={formData.locale}
            onChange={(e) => setFormData({ ...formData, locale: e.target.value })}
            className="input-field"
          >
            {availableLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName}
              </option>
            ))}
          </select>
          <small className="help-text">
            {t.languageHelp}
          </small>
        </div>

        <div className="form-group">
          <label>
            📝 {t.promptLabel}
          </label>
          <textarea
            value={formData.promptPattern}
            onChange={(e) => setFormData({ ...formData, promptPattern: e.target.value })}
            rows={6}
            className="input-field textarea"
            placeholder={t.promptPlaceholder}
          />
          <small className="help-text">
            {t.promptHelp}
          </small>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              ⏱️ {t.requestDelayLabel}
            </label>
            <input
              type="number"
              value={formData.requestDelay}
              onChange={(e) => setFormData({ ...formData, requestDelay: parseInt(e.target.value) })}
              min="500"
              max="10000"
              step="100"
              className="input-field"
            />
            <small className="help-text">{t.requestDelayHelp}</small>
          </div>

          <div className="form-group">
            <label>
              📦 {t.chunkSizeLabel}
            </label>
            <input
              type="number"
              value={formData.chunkSize}
              onChange={(e) => setFormData({ ...formData, chunkSize: parseInt(e.target.value) })}
              min="1"
              max="20"
              className="input-field"
            />
            <small className="help-text">{t.chunkSizeHelp}</small>
          </div>
        </div>

        <div className="button-group">
          <button className="btn btn-secondary" onClick={handleReset}>
            🔄 {t.resetButton}
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            💾 {t.saveButton}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
