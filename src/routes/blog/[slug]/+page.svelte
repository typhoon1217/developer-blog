<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	import { t } from '$lib/stores/locale';
	import type { BlogPost } from '$lib/types';
	
	let { data } = $props();
	const post: BlogPost = data.post;
	
	// Format date
	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat($t('site.title').includes('정우신') ? 'ko-KR' : 'en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(date);
	}
</script>

<svelte:head>
	<title>{post.title} - {$t('site.title')}</title>
	<meta name="description" content={post.description} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.description} />
	<meta property="og:type" content="article" />
	<meta property="article:published_time" content={post.date.toISOString()} />
	{#if post.updated}
		<meta property="article:modified_time" content={post.updated.toISOString()} />
	{/if}
	<meta property="article:author" content={post.author} />
	{#each post.tags as tag}
		<meta property="article:tag" content={tag} />
	{/each}
</svelte:head>

<div class="blog-post-container">
	<article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Article Header -->
	<header class="mb-8">
		<!-- Back to blog link -->
		<a href="/blog" class="inline-flex items-center text-sm hover:underline mb-6">
			<Icon name="arrow-left" size={16} class="mr-1" />
			{$t('blog.backToBlog')}
		</a>
		
		<!-- Categories -->
		{#if post.categories.length > 0}
			<div class="flex flex-wrap gap-2 mb-4">
				{#each post.categories as category}
					<a 
						href="/blog/category/{category.toLowerCase().replace(/\s+/g, '-')}"
						class="inline-flex items-center px-3 py-1 rounded-full text-sm border transition-all"
					>
						<Icon name="tag" size={14} class="mr-1" />
						{category}
					</a>
				{/each}
			</div>
		{/if}
		
		<!-- Title -->
		<h1 class="text-4xl sm:text-5xl font-bold mb-4">{post.title}</h1>
		
		<!-- Meta information -->
		<div class="flex flex-wrap items-center gap-4 text-sm text-muted">
			<div class="flex items-center gap-1">
				<Icon name="user" size={16} />
				<span>{post.author}</span>
			</div>
			<div class="flex items-center gap-1">
				<Icon name="calendar" size={16} />
				<time datetime={post.date.toISOString()}>
					{$t('blog.publishedOn', { values: { date: formatDate(post.date) } })}
				</time>
			</div>
			{#if post.updated}
				<div class="flex items-center gap-1">
					<Icon name="pen" size={16} />
					<time datetime={post.updated.toISOString()}>
						{$t('blog.updatedOn', { values: { date: formatDate(post.updated) } })}
					</time>
				</div>
			{/if}
			<div class="flex items-center gap-1">
				<Icon name="clock" size={16} />
				<span>{post.readingTime || 5} {$t('blog.minRead', { values: { minutes: post.readingTime || 5 } })}</span>
			</div>
		</div>
	</header>
	
	<!-- Cover Image -->
	{#if post.coverImage}
		<img 
			src={post.coverImage} 
			alt={post.title}
			class="w-full rounded-lg mb-8"
		/>
	{/if}
	
	<!-- Article Content -->
	<div class="prose prose-lg max-w-none">
		{#if post.content && typeof post.content === 'function'}
			<svelte:component this={post.content} />
		{:else}
			<p>{post.description}</p>
		{/if}
	</div>
	
	<!-- Tags -->
	{#if post.tags.length > 0}
		<footer class="mt-12 pt-8 border-t border">
			<div class="flex items-center gap-2 mb-4">
				<Icon name="tag" size={20} />
				<span class="font-medium">Tags:</span>
			</div>
			<div class="flex flex-wrap gap-2">
				{#each post.tags as tag}
					<a 
						href="/blog/tag/{tag.toLowerCase().replace(/\s+/g, '-')}"
						class="inline-flex items-center px-3 py-1 rounded-full text-sm border transition-all"
					>
						{tag}
					</a>
				{/each}
			</div>
		</footer>
	{/if}
</article>
	
	<!-- Table of Contents -->
	<aside class="toc-container">
		<TableOfContents />
	</aside>
</div>

<style>
	/* Blog post layout */
	.blog-post-container {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		max-width: 1400px;
		margin: 0 auto;
	}
	
	@media (min-width: 1280px) {
		.blog-post-container {
			grid-template-columns: 1fr 300px;
		}
	}
	
	.toc-container {
		display: none;
	}
	
	@media (min-width: 1280px) {
		.toc-container {
			display: block;
			padding-top: 3rem;
		}
	}
	
	/* Prose styling for markdown content */
	:global(.prose) {
		color: var(--color-text);
		max-width: none;
	}
	
	:global(.prose h1),
	:global(.prose h2),
	:global(.prose h3),
	:global(.prose h4),
	:global(.prose h5),
	:global(.prose h6) {
		color: var(--color-text);
	}
	
	:global(.prose a) {
		color: var(--color-text);
		text-decoration: underline;
	}
	
	:global(.prose a:hover) {
		opacity: 0.8;
	}
	
	:global(.prose code) {
		background-color: var(--color-hover);
		color: var(--color-text);
	}
	
	:global(.prose pre) {
		background-color: var(--color-hover);
		color: var(--color-text);
	}
	
	:global(.prose blockquote) {
		border-left-color: var(--color-text);
		color: var(--color-text-muted);
	}
	
	:global(.prose strong) {
		color: var(--color-text);
	}
	
	:global(.prose ul li::before),
	:global(.prose ol li::before) {
		color: var(--color-text-muted);
	}
	
	/* Syntax highlighting */
	:global(.prose pre) {
		margin: 1.5rem 0;
		border-radius: 0.5rem;
		overflow-x: auto;
	}
	
	:global(.prose pre code) {
		background: none;
		padding: 0;
		font-size: 0.875rem;
		line-height: 1.7;
	}
	
	:global(.prose code) {
		font-size: 0.875em;
		padding: 0.2em 0.4em;
		border-radius: 0.25rem;
	}
	
	/* Shiki theme adjustments */
	:global(.shiki) {
		padding: 1.5rem;
		margin: 0;
	}
	
	:global(.shiki code) {
		counter-reset: step;
		counter-increment: step 0;
	}
	
	:global(.shiki .line) {
		display: inline-block;
		width: 100%;
	}
	
	/* Tables */
	:global(.prose table) {
		width: 100%;
		margin: 2rem 0;
		border-collapse: collapse;
	}
	
	:global(.prose th) {
		background: var(--color-hover);
		padding: 0.75rem;
		text-align: left;
		font-weight: 600;
		border-bottom: 2px solid var(--color-border);
	}
	
	:global(.prose td) {
		padding: 0.75rem;
		border-bottom: 1px solid var(--color-border);
	}
	
	:global(.prose tbody tr:hover) {
		background: var(--color-hover);
	}
</style>