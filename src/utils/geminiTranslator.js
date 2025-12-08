import { GoogleGenerativeAI } from '@google/generative-ai'

export class GeminiTranslator {
  constructor(apiKey, settings) {
    this.genAI = new GoogleGenerativeAI(apiKey)
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    this.settings = settings
  }

  async translateChunk(texts, fromLang, toLang) {
    const combinedText = texts.join('\n---\n')
    
    const prompt = this.settings.promptPattern
      .replace('{fromLang}', fromLang)
      .replace('{toLang}', toLang)
      .replace('{text}', combinedText)

    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const translatedText = response.text()
      
      const translatedTexts = translatedText.split(/\n---\n/)
      
      if (translatedTexts.length !== texts.length) {
        return texts.map((_, i) => translatedTexts[i] || translatedTexts[0] || texts[i])
      }
      
      return translatedTexts
    } catch (error) {
      console.error('Translation error:', error)
      throw error
    }
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async translateSubtitles(subtitles, fromLang, toLang, onProgress, onChunkComplete) {
    const chunkSize = this.settings.chunkSize
    const delay = this.settings.requestDelay
    
    const translatedSubtitles = []
    let processedCount = 0

    for (let i = 0; i < subtitles.length; i += chunkSize) {
      const chunk = subtitles.slice(i, i + chunkSize)
      const texts = chunk.map(sub => sub.text)

      try {
        const translatedTexts = await this.translateChunk(texts, fromLang, toLang)
        
        const translatedChunk = chunk.map((sub, idx) => ({
          ...sub,
          text: translatedTexts[idx] || sub.text
        }))

        translatedSubtitles.push(...translatedChunk)
        processedCount += chunk.length

        if (onChunkComplete) {
          onChunkComplete(translatedSubtitles, processedCount, subtitles.length)
        }

        if (onProgress) {
          onProgress(processedCount, subtitles.length)
        }

        if (i + chunkSize < subtitles.length) {
          await this.sleep(delay)
        }
      } catch (error) {
        console.error(`Error translating chunk ${i / chunkSize + 1}:`, error)
        
        const fallbackChunk = chunk.map(sub => ({ ...sub }))
        translatedSubtitles.push(...fallbackChunk)
        processedCount += chunk.length

        if (error.message?.includes('429') || error.message?.includes('quota')) {
          await this.sleep(delay * 3)
        } else {
          await this.sleep(delay)
        }
      }
    }

    return translatedSubtitles
  }
}
