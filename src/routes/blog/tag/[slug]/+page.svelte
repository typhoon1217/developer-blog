<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { t } from '$lib/stores/locale';
	import type { BlogPost } from '$lib/types';
	
	let { data } = $props();
	const { tag, posts } = data;
	
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
	<title>Tag: {tag} - {$t('site.title')}</title>
	<meta name="description" content="Posts tagged with {tag}" />
</svelte:head>

<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="text-center mb-12">
		<div class="flex items-center justify-center mb-4">
			<div class="p-3 border rounded-lg">
				<Icon name="tag" size={32} />
			</div>
		</div>
		<h1 class="text-4xl font-bold mb-4">Tag: {tag}</h1>
		<p class="text-lg text-muted">
			{posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with "{tag}"
		</p>
		<div class="mt-4">
			<a href="/blog" class="inline-flex items-center text-sm">
				<Icon name="arrow-left" size={16} class="mr-1" />
				{$t('blog.backToBlog')}
			</a>
		</div>
	</div>

	<!-- Posts Grid -->
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
					<!-- Category Badge -->
					<div class="flex items-center gap-2 mb-3">
						{#if post.categories[0]}
							<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border">
								<Icon name="tag" size={12} class="mr-1" />
								{post.categories[0]}
							</span>
						{/if}
						<span class="text-sm text-muted">•</span>
						<span class="text-sm text-muted">{post.readingTime || 5} {$t('blog.minRead', { values: { minutes: post.readingTime || 5 } })}</span>
					</div>
					
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
						
						<div class="flex items-center gap-1">
							{#each post.tags.slice(0, 2) as postTag}
								<span class="inline-flex items-center px-2 py-1 rounded text-xs border">
									{postTag}
								</span>
							{/each}
						</div>
					</div>
				</div>
			</article>
		{/each}
	</div>
</div>
