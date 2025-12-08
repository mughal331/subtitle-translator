import { useState, useRef } from 'react'
import './Translator.css'
import { parseSRT, generateSRT, detectLanguage } from '../utils/srtParser'
import { GeminiTranslator } from '../utils/geminiTranslator'

function Translator({ settings, t }) {
  const [sourceContent, setSourceContent] = useState('')
  const [translatedContent, setTranslatedContent] = useState('')
  const [fromLang, setFromLang] = useState('auto')
  const [toLang, setToLang] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [detectedLang, setDetectedLang] = useState('')
  const fileInputRef = useRef(null)

  const LANGUAGES = [
    { code: 'auto', name: t.languages.auto },
    { code: 'English', name: t.languages.English },
    { code: 'Spanish', name: t.languages.Spanish },
    { code: 'French', name: t.languages.French },
    { code: 'German', name: t.languages.German },
    { code: 'Italian', name: t.languages.Italian },
    { code: 'Portuguese', name: t.languages.Portuguese },
    { code: 'Russian', name: t.languages.Russian },
    { code: 'Japanese', name: t.languages.Japanese },
    { code: 'Korean', name: t.languages.Korean },
    { code: 'Chinese', name: t.languages.Chinese },
    { code: 'Arabic', name: t.languages.Arabic },
    { code: 'Hindi', name: t.languages.Hindi },
    { code: 'Turkish', name: t.languages.Turkish },
    { code: 'Dutch', name: t.languages.Dutch },
    { code: 'Polish', name: t.languages.Polish },
    { code: 'Swedish', name: t.languages.Swedish },
    { code: 'Persian', name: t.languages.Persian },
    { code: 'Thai', name: t.languages.Thai },
    { code: 'Vietnamese', name: t.languages.Vietnamese },
  ]

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target.result
        setSourceContent(content)
        setTranslatedContent('')
        setProgress({ current: 0, total: 0 })
        
        if (fromLang === 'auto') {
          const detected = detectLanguage(content)
          setDetectedLang(detected)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleTranslate = async () => {
    if (!settings.apiKey) {
      alert(t.alertNoApiKey)
      return
    }

    if (!sourceContent.trim()) {
      alert(t.alertNoFile)
      return
    }

    if (!toLang) {
      alert(t.alertNoTargetLang || 'Please select a target language!')
      return
    }

    setIsTranslating(true)
    setTranslatedContent('')
    setProgress({ current: 0, total: 0 })

    try {
      const subtitles = parseSRT(sourceContent)
      
      if (subtitles.length === 0) {
        alert(t.alertInvalidSrt)
        setIsTranslating(false)
        return
      }

      setProgress({ current: 0, total: subtitles.length })

      const sourceLang = fromLang === 'auto' ? (detectedLang || 'English') : fromLang
      const translator = new GeminiTranslator(settings.apiKey, settings)

      await translator.translateSubtitles(
        subtitles,
        sourceLang,
        toLang,
        (current, total) => {
          setProgress({ current, total })
        },
        (translatedSubs) => {
          const srtContent = generateSRT(translatedSubs)
          setTranslatedContent(srtContent)
        }
      )

    } catch (error) {
      console.error('Translation error:', error)
      alert(t.alertTranslationFailed + ' ' + error.message)
    } finally {
      setIsTranslating(false)
    }
  }

  const handleDownload = () => {
    if (!translatedContent) {
      alert(t.alertNoContent)
      return
    }

    const blob = new Blob([translatedContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `translated_${toLang}.srt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const progressPercent = progress.total > 0 
    ? Math.round((progress.current / progress.total) * 100) 
    : 0

  return (
    <div className="translator-container">
      <div className="controls-panel">
        <div className="upload-section">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".srt"
            style={{ display: 'none' }}
          />
          <button 
            className="btn btn-upload"
            onClick={() => fileInputRef.current?.click()}
            disabled={isTranslating}
          >
            📁 {t.uploadButton}
          </button>
        </div>

        <div className="language-selectors">
          <div className="selector-group">
            <label>{t.fromLabel}</label>
            <select 
              value={fromLang} 
              onChange={(e) => setFromLang(e.target.value)}
              disabled={isTranslating}
              className="lang-select"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            {fromLang === 'auto' && detectedLang && (
              <span className="detected-lang">{t.detected}: {detectedLang}</span>
            )}
          </div>

          <div className="arrow">→</div>

          <div className="selector-group">
            <label>{t.toLabel} <span className="required">*</span></label>
            <select 
              value={toLang} 
              onChange={(e) => setToLang(e.target.value)}
              disabled={isTranslating}
              className="lang-select"
            >
              <option value="">{t.selectLanguage || 'Select target language...'}</option>
              {LANGUAGES.filter(l => l.code !== 'auto').map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="btn btn-translate"
            onClick={handleTranslate}
            disabled={isTranslating || !sourceContent}
          >
            {isTranslating ? `⏳ ${t.translating}` : `🚀 ${t.translateButton}`}
          </button>
          <button 
            className="btn btn-download"
            onClick={handleDownload}
            disabled={!translatedContent || isTranslating}
          >
            💾 {t.downloadButton}
          </button>
        </div>

        {isTranslating && (
          <div className="progress-section">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="progress-text">
              {progress.current} / {progress.total} {t.progressText} ({progressPercent}%)
            </div>
          </div>
        )}
      </div>

      <div className="content-panels">
        <div className="panel">
          <div className="panel-header">
            <h3>📄 {t.sourcePanelTitle}</h3>
            <span className="subtitle-count">
              {sourceContent ? parseSRT(sourceContent).length : 0} {t.entries}
            </span>
          </div>
          <textarea
            className="content-area"
            value={sourceContent}
            onChange={(e) => setSourceContent(e.target.value)}
            placeholder={t.sourcePlaceholder}
            disabled={isTranslating}
          />
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>✨ {t.translatedPanelTitle}</h3>
            <span className="subtitle-count">
              {translatedContent ? parseSRT(translatedContent).length : 0} {t.entries}
            </span>
          </div>
          <textarea
            className="content-area"
            value={translatedContent}
            readOnly
            placeholder={t.translatedPlaceholder}
          />
        </div>
      </div>
    </div>
  )
}

export default Translator
