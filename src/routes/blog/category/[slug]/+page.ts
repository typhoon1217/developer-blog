import type { PageLoad } from './$types';
import { loadPosts } from '$lib/utils/posts';
import { categories } from '$lib/config';
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { get } from 'svelte/store';
import { currentLocale } from '$lib/stores/locale';

export const prerender = false;

export const load: PageLoad = async ({ params }) => {
  // Find the category
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    throw error(404, 'Category not found');
  }
  
  // Load all posts
  const locale = browser ? get(currentLocale) : 'en';
  const allPosts = await loadPosts(locale);
  
  // Filter posts by category
  const posts = allPosts.filter(post => 
    post.categories.includes(category.name)
  );
  
  return {
    category,
    posts
  };
};
