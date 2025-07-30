import type { Handle } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';

export const handle: Handle = async ({ event, resolve }) => {
  // Get locale from cookie or default to 'en'
  const lang = event.cookies.get('locale') || 'en';
  
  // Initialize locale for this request
  locale.set(lang);
  
  // Add locale to locals for use in load functions
  event.locals.locale = lang;
  
  // Add lang attribute to html element
  const response = await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang)
  });
  
  return response;
};