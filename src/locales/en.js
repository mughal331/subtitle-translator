export default {
  // Header
  appTitle: "Subtitle Translator",
  settingsButton: "Settings",
  closeButton: "Close",
  donateButton: "Donate",

  // Translator
  uploadButton: "Upload SRT File",
  fromLabel: "From:",
  toLabel: "To:",
  detected: "Detected",
  translateButton: "Translate",
  translating: "Translating...",
  downloadButton: "Download",
  selectLanguage: "Select target language...",
  
  // Panels
  sourcePanelTitle: "Source Subtitles",
  translatedPanelTitle: "Translated Subtitles",
  entries: "entries",
  sourcePlaceholder: "Upload an SRT file or paste subtitle content here...",
  translatedPlaceholder: "Translated subtitles will appear here in real-time...",
  
  // Progress
  progressText: "subtitles",

  // Settings
  settingsTitle: "Settings",
  apiKeyLabel: "Gemini API Key",
  required: "*",
  apiKeyPlaceholder: "Enter your Gemini API key",
  apiKeyHelp: "Get your FREE API key from",
  googleAiStudio: "Google AI Studio",
  
  apiKeyInstructions: "How to get your FREE Gemini API key:",
  apiKeyStep1: "Visit",
  apiKeyStep2: "Sign in with your Google account",
  apiKeyStep3: "Click 'Get API Key' or 'Create API Key'",
  apiKeyStep4: "Copy the key and paste it above",
  apiKeyNote: "Note: Your API key is stored only in your browser and never sent to our servers. It's used directly to communicate with Google's Gemini API.",
  apiKeySecurity: "🔒 Your API key is stored locally and secure",
  
  promptLabel: "Translation Prompt Pattern",
  promptPlaceholder: "Enter prompt pattern",
  promptHelp: "Use {fromLang}, {toLang}, and {text} as placeholders",
  
  requestDelayLabel: "Request Delay (ms)",
  requestDelayHelp: "Delay between API requests",
  
  chunkSizeLabel: "Chunk Size",
  chunkSizeHelp: "Subtitles per request",
  
  languageLabel: "Interface Language",
  languageHelp: "Choose your preferred language",
  
  resetButton: "Reset to Default",
  saveButton: "Save Settings",
  settingsSaved: "Settings saved successfully!",

  // Languages
  languages: {
    auto: "Auto Detect",
    English: "English",
    Spanish: "Spanish",
    French: "French",
    German: "German",
    Italian: "Italian",
    Portuguese: "Portuguese",
    Russian: "Russian",
    Japanese: "Japanese",
    Korean: "Korean",
    Chinese: "Chinese (Simplified)",
    Arabic: "Arabic",
    Hindi: "Hindi",
    Turkish: "Turkish",
    Dutch: "Dutch",
    Polish: "Polish",
    Swedish: "Swedish",
    Persian: "Persian",
    Thai: "Thai",
    Vietnamese: "Vietnamese"
  },

  // Alerts
  alertNoApiKey: "Please set your Gemini API key in Settings first!",
  alertNoFile: "Please upload a subtitle file first!",
  alertInvalidSrt: "Invalid SRT file format!",
  alertTranslationFailed: "Translation failed:",
  alertNoContent: "No translated content to download!",
  alertNoTargetLang: "Please select a target language!"
}
