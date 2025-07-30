import { browser } from '$app/environment';
import { initI18n } from '$lib/i18n';
import { waitLocale } from 'svelte-i18n';

export async function load({ data }) {
  const serverLocale = data?.locale || 'en';
  
  if (browser) {
    initI18n(serverLocale);
    await waitLocale();
  }
  
  return {
    locale: serverLocale
  };
}