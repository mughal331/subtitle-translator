import en from './en'
import fa from './fa'

export const locales = {
  en,
  fa
}

export const availableLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی' }
]

export function getLocale(code) {
  return locales[code] || locales.en
}
