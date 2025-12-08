export function parseSRT(content) {
  const blocks = content.trim().split(/\n\n+/)
  const subtitles = []

  for (const block of blocks) {
    const lines = block.trim().split('\n')
    if (lines.length >= 3) {
      const index = lines[0].trim()
      const timestamp = lines[1].trim()
      const text = lines.slice(2).join('\n')
      
      subtitles.push({
        index: parseInt(index),
        timestamp,
        text
      })
    }
  }

  return subtitles
}

export function generateSRT(subtitles) {
  return subtitles
    .map(sub => `${sub.index}\n${sub.timestamp}\n${sub.text}`)
    .join('\n\n') + '\n'
}

export function chunkArray(array, size) {
  const chunks = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

export function detectLanguage(text) {
  const sample = text.slice(0, 500)
  
  const patterns = {
    'Arabic': /[\u0600-\u06FF]/,
    'Chinese': /[\u4E00-\u9FFF]/,
    'Japanese': /[\u3040-\u309F\u30A0-\u30FF]/,
    'Korean': /[\uAC00-\uD7AF]/,
    'Russian': /[\u0400-\u04FF]/,
    'Greek': /[\u0370-\u03FF]/,
    'Hebrew': /[\u0590-\u05FF]/,
    'Thai': /[\u0E00-\u0E7F]/,
    'Persian': /[\u0600-\u06FF]/,
  }

  for (const [lang, pattern] of Object.entries(patterns)) {
    if (pattern.test(sample)) {
      return lang
    }
  }

  return 'English'
}
