export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: Date;
	updated?: Date;
	published: boolean;
	featured?: boolean;
	author: string;
	tags: string[];
	categories: string[];
	readingTime: number;
	content?: string;
	excerpt?: string;
	coverImage?: string;
	metadata?: BlogPostMetadata;
}

export interface BlogPostMetadata {
	wordCount: number;
	headings: HeadingNode[];
	tableOfContents: TableOfContentsItem[];
}

export interface HeadingNode {
	level: number;
	text: string;
	id: string;
}

export interface TableOfContentsItem {
	level: number;
	text: string;
	id: string;
	children: TableOfContentsItem[];
}

export interface BlogCategory {
	name: string;
	slug: string;
	description: string;
	color?: string;
	icon?: string;
}

export interface BlogTag {
	name: string;
	slug: string;
	description?: string;
	color?: string;
}

export interface BlogConfig {
	siteName: string;
	siteDescription: string;
	author: {
		name: string;
		email: string;
		bio: string;
		avatar?: string;
		social: {
			github?: string;
			twitter?: string;
			linkedin?: string;
			website?: string;
		};
	};
	seo: {
		keywords: string[];
		ogImage?: string;
	};
	features: {
		search: boolean;
		rss: boolean;
		comments: boolean;
		analytics: boolean;
	};
}

export interface PaginatedPosts {
	posts: BlogPost[];
	totalPages: number;
	currentPage: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}