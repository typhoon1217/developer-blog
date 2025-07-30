import type { LayoutServerLoad } from './$types';
import { locale } from 'svelte-i18n';

export const load: LayoutServerLoad = async ({ cookies }) => {
  // Get locale from cookie or default to 'en'
  const userLocale = cookies.get('locale') || 'en';
  
  // Set locale for this request
  locale.set(userLocale);
  
  // Set cookie if not present
  if (!cookies.get('locale')) {
    cookies.set('locale', userLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'strict'
    });
  }
  
  return {
    locale: userLocale
  };
};