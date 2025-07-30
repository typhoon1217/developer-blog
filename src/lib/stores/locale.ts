import { derived } from 'svelte/store';
import { locale as i18nLocale, _ } from 'svelte-i18n';
import { setLocale, type Locale } from '$lib/i18n';

// Re-export the i18n locale store for convenience
export const locale = {
  ...i18nLocale,
  set: (value: Locale) => {
    setLocale(value);
    i18nLocale.set(value);
  }
};

// Export translation function
export { _ as t };

// Derived store for current locale value
export const currentLocale = derived(i18nLocale, $locale => $locale as Locale);