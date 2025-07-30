import type { PageLoad } from './$types';
import { loadPost } from '$lib/utils/posts';
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { get } from 'svelte/store';
import { currentLocale } from '$lib/stores/locale';

export const prerender = false;

export const load: PageLoad = async ({ params }) => {
  const post = await loadPost(params.slug, 'en');
  
  if (!post) {
    throw error(404, 'Post not found');
  }
  
  return {
    post
  };
};