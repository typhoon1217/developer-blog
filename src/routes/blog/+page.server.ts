import type { PageServerLoad } from './$types';
import { loadPosts } from '$lib/utils/posts';

export const load: PageServerLoad = async ({ cookies }) => {
  // Get locale from cookie, default to 'en'
  const locale = cookies.get('locale') || 'en';
  
  // Load posts for the specific locale
  const posts = await loadPosts(locale);
  
  console.log(`Server load - locale: ${locale}, posts: ${posts.length}`);
  
  return {
    posts
  };
};