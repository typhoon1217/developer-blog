<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { t } from '$lib/stores/locale';
	import type { BlogPost } from '$lib/types';
	
	let { data } = $props();
	const { category, posts } = data;
	
	// Format date
	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat($t('site.title') === 'Typhoon.dev' ? 'en-US' : 'ko-KR', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(date);
	}
</script>

<svelte:head>
	<title>{$t(`categories.${category.slug}.name`)} - {$t('site.title')}</title>
	<meta name="description" content={$t(`categories.${category.slug}.description`)} />
</svelte:head>

<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="text-center mb-12">
		<div class="flex items-center justify-center mb-4">
			<div class="p-3 border rounded-lg">
				<Icon name={category.icon} size={32} />
			</div>
		</div>
		<h1 class="text-4xl font-bold mb-4">{$t(`categories.${category.slug}.name`)}</h1>
		<p class="text-lg text-muted max-w-2xl mx-auto">
			{$t(`categories.${category.slug}.description`)}
		</p>
		<div class="mt-4">
			<a href="/categories" class="inline-flex items-center text-sm">
				<Icon name="arrow-left" size={16} class="mr-1" />
				{$t('categories.backToCategories', { default: 'Back to all categories' })}
			</a>
		</div>
	</div>

	<!-- Posts Grid -->
	{#if posts.length > 0}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			{#each posts as post}
				<article class="border rounded-lg overflow-hidden transition-all">
					<!-- Post Image Placeholder -->
					{#if post.coverImage}
						<img src={post.coverImage} alt={post.title} class="w-full aspect-video object-cover" />
					{:else}
						<div class="aspect-video bg-hover flex items-center justify-center border-b">
							<Icon name="book-open" size={48} class="text-muted" />
						</div>
					{/if}
					
					<!-- Post Content -->
					<div class="p-6">
						<!-- Post Title -->
						<h2 class="text-xl font-semibold mb-2">
							<a href="/blog/{post.slug}" class="hover:underline">
								{post.title}
							</a>
						</h2>
						
						<!-- Post Excerpt -->
						<p class="text-muted mb-4 line-clamp-3">
							{post.description}
						</p>
						
						<!-- Post Meta -->
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-2 text-sm text-muted">
								<Icon name="calendar" size={16} />
								<time datetime={post.date.toISOString()}>
									{formatDate(post.date)}
								</time>
							</div>
							
							<div class="flex items-center gap-2 text-sm text-muted">
								<Icon name="clock" size={16} />
								<span>{post.readingTime || 5} {$t('blog.minRead', { values: { minutes: post.readingTime || 5 } })}</span>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<!-- Empty State -->
		<div class="text-center py-12">
			<Icon name="book-open" size={48} class="mx-auto text-muted mb-4" />
			<h3 class="text-lg font-medium mb-2">{$t('categories.noPostsInCategory', { default: 'No posts in this category yet' })}</h3>
			<p class="text-muted mb-6">{$t('blog.checkBackSoon')}</p>
			<a 
				href="/blog" 
				class="inline-flex items-center font-medium"
			>
				{$t('blog.viewAllPosts')}
				<Icon name="arrow-right" size={16} class="ml-1" />
			</a>
		</div>
	{/if}
</div>
