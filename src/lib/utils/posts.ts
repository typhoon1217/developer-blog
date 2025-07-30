import type { BlogPost } from '$lib/types';
import { browser } from '$app/environment';
import { currentLocale } from '$lib/stores/locale';
import { get } from 'svelte/store';

interface PostModule {
  metadata: Omit<BlogPost, 'slug'>;
  default: any;
}

export async function loadPosts(locale?: string): Promise<BlogPost[]> {
  const lang = locale || (browser ? get(currentLocale) : 'en') || 'en';
  const posts: BlogPost[] = [];
  
  console.log('Loading posts for locale:', lang);
  
  try {
    // Try to load posts for the specific locale
    const postModules = import.meta.glob<PostModule>('/src/posts/*/*.svx', { eager: true });
    
    console.log('Found post modules:', Object.keys(postModules));
    
    for (const [path, module] of Object.entries(postModules)) {
      // Extract language and slug from path
      const match = path.match(/\/src\/posts\/([^\/]+)\/(.+)\.svx$/);
      if (!match) continue;
      
      const [, postLang, filename] = match;
      
      // Only include posts for the current language
      if (postLang !== lang) continue;
      
      const slug = filename;
      const post: BlogPost = {
        ...module.metadata,
        slug,
        date: new Date(module.metadata.date),
        updated: module.metadata.updated ? new Date(module.metadata.updated) : undefined,
      };
      
      posts.push(post);
    }
    
    // If no posts found for the locale and it's not English, fallback to English
    if (posts.length === 0 && lang !== 'en') {
      return loadPosts('en');
    }
  } catch (error) {
    console.error('Error loading posts:', error);
  }
  
  // Sort posts by date (newest first)
  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function loadPost(slug: string, locale?: string): Promise<BlogPost | null> {
  const lang = locale || (browser ? get(currentLocale) : 'en') || 'en';
  
  try {
    // Use glob to find the post
    const postModules = import.meta.glob<PostModule>('/src/posts/*/*.svx');
    const postPath = `/src/posts/${lang}/${slug}.svx`;
    
    if (postModules[postPath]) {
      const module = await postModules[postPath]() as PostModule;
      
      const post: BlogPost = {
        ...module.metadata,
        slug,
        date: new Date(module.metadata.date),
        updated: module.metadata.updated ? new Date(module.metadata.updated) : undefined,
        content: module.default,
      };
      
      return post;
    }
  } catch (error) {
    console.error('Error loading post:', error);
  }
  
  // If not found and not English, try English
  if (lang !== 'en') {
    try {
      const postModules = import.meta.glob<PostModule>('/src/posts/*/*.svx');
      const postPath = `/src/posts/en/${slug}.svx`;
      
      if (postModules[postPath]) {
        const module = await postModules[postPath]() as PostModule;
        
        const post: BlogPost = {
          ...module.metadata,
          slug,
          date: new Date(module.metadata.date),
          updated: module.metadata.updated ? new Date(module.metadata.updated) : undefined,
          content: module.default,
        };
        
        return post;
      }
    } catch (error) {
      console.error('Error loading fallback post:', error);
    }
  }
  
  return null;
}