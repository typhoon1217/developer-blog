import type { BlogPost } from '../types/index.js';

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(date);
}

export function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute);
}

export function extractExcerpt(content: string, maxLength: number = 160): string {
	const stripped = content.replace(/(<([^>]+)>)/gi, '');
	return stripped.length > maxLength 
		? stripped.substring(0, maxLength).trim() + '...'
		: stripped;
}

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
	return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
	return posts.filter(post => 
		post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
	);
}

export function filterPostsByCategory(posts: BlogPost[], category: string): BlogPost[] {
	return posts.filter(post => 
		post.categories.some(c => c.toLowerCase() === category.toLowerCase())
	);
}

export function getUniqueTags(posts: BlogPost[]): string[] {
	const tags = new Set<string>();
	posts.forEach(post => {
		post.tags.forEach(tag => tags.add(tag));
	});
	return Array.from(tags).sort();
}

export function getUniqueCategories(posts: BlogPost[]): string[] {
	const categories = new Set<string>();
	posts.forEach(post => {
		post.categories.forEach(category => categories.add(category));
	});
	return Array.from(categories).sort();
}