import { browser } from '$app/environment';
import { init, addMessages, getLocaleFromNavigator, locale } from 'svelte-i18n';
import en from './locales/en.json';
import ko from './locales/ko.json';

// Define supported locales
export const supportedLocales = ['en', 'ko'] as const;
export type Locale = typeof supportedLocales[number];

// Add messages for each locale immediately
addMessages('en', en);
addMessages('ko', ko);

// Initialize i18n with proper server/client handling
export function initI18n(defaultLocale?: string) {
  // Get saved locale from localStorage or browser language
  const savedLocale = browser ? localStorage.getItem('locale') : null;
  const browserLocale = browser ? getLocaleFromNavigator() : null;
  
  // Check if browser locale is supported, otherwise default to 'en'
  const detectedLocale = browserLocale?.split('-')[0] || 'en';
  const initialLocale = savedLocale || defaultLocale || (supportedLocales.includes(detectedLocale as Locale) ? detectedLocale : 'en');

  init({
    fallbackLocale: 'en',
    initialLocale: initialLocale,
    loadingDelay: 0,
  });
}

// Initialize with default locale to prevent server errors
if (!browser) {
  // Server-side: initialize with English as default
  init({
    fallbackLocale: 'en',
    initialLocale: 'en',
    loadingDelay: 0,
  });
}

// Helper to save locale preference
export function setLocale(locale: Locale) {
  if (browser) {
    localStorage.setItem('locale', locale);
  }
}