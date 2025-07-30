import type { PageLoad } from './$types';
import { loadPosts } from '$lib/utils/posts';
import { browser } from '$app/environment';
import { get } from 'svelte/store';
import { currentLocale } from '$lib/stores/locale';

export const load: PageLoad = async ({ data }) => {
  // If we have server data, use it
  if (data?.posts) {
    return {
      posts: data.posts
    };
  }
  
  // Fallback to client-side loading
  const locale = browser ? get(currentLocale) : 'en';
  const posts = await loadPosts(locale);
  
  console.log('Client load - posts returned:', posts.length);
  
  return {
    posts
  };
};