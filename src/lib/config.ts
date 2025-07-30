import type { BlogConfig } from './types/index.js';

export const blogConfig: BlogConfig = {
	siteName: 'Typhoon.dev',
	siteDescription: 'Backend Developer • Linux Enthusiast • Infrastructure Optimizer - Sharing insights on Java/Spring, DevOps, and practical solutions',
	author: {
		name: 'JungwooShin',
		email: 'typhoon1217@example.com',
		bio: 'Backend developer passionate about Linux and crafting practical solutions. Specialized in Java/Spring with expertise in infrastructure optimization.',
		social: {
			github: 'https://github.com/typhoon1217',
			// twitter: 'https://twitter.com/typhoon1217',
			// linkedin: 'https://linkedin.com/in/jungwooshin',
			// website: 'https://jungwooshin.dev'
		}
	},
	seo: {
		keywords: [
			'backend development',
			'java spring',
			'linux',
			'infrastructure',
			'devops',
			'arch linux',
			'docker',
			'postgresql',
			'tech blog'
		]
	},
	features: {
		search: true,
		rss: true,
		comments: false,
		analytics: false
	}
};

export const categories = [
	{
		name: 'Backend Development',
		slug: 'backend',
		description: 'Java/Spring, API design, and backend architecture insights',
		color: 'blue',
		icon: 'code'
	},
	{
		name: 'Infrastructure & DevOps',
		slug: 'infrastructure',
		description: 'Linux, Docker, cloud platforms, and infrastructure optimization',
		color: 'green',
		icon: 'server'
	},
	{
		name: 'Linux & Systems',
		slug: 'linux',
		description: 'Arch Linux, system administration, and command-line mastery',
		color: 'purple',
		icon: 'cpu'
	},
	{
		name: 'Learning Journey',
		slug: 'learning',
		description: 'Study notes, new technologies, and skill development',
		color: 'indigo',
		icon: 'book-open'
	},
	{
		name: 'Daily Dev Life',
		slug: 'daily-life',
		description: 'Personal experiences, insights, and life as a developer',
		color: 'orange',
		icon: 'user'
	}
] as const;