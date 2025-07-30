import type { PageLoad } from './$types';
import { loadPosts } from '$lib/utils/posts';
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { get } from 'svelte/store';
import { currentLocale } from '$lib/stores/locale';

export const prerender = false;

export const load: PageLoad = async ({ params }) => {
  // Convert slug back to tag name (e.g., "spring-boot" -> "spring-boot")
  const tagName = params.slug;
  
  // Load all posts
  const locale = browser ? get(currentLocale) : 'en';
  const allPosts = await loadPosts(locale);
  
  // Filter posts by tag
  const posts = allPosts.filter(post => 
    post.tags.some(tag => tag.toLowerCase().replace(/\s+/g, '-') === tagName)
  );
  
  if (posts.length === 0) {
    throw error(404, 'No posts found with this tag');
  }
  
  // Get the actual tag name from the first post
  const actualTagName = posts[0].tags.find(tag => 
    tag.toLowerCase().replace(/\s+/g, '-') === tagName
  ) || tagName;
  
  return {
    tag: actualTagName,
    posts
  };
};