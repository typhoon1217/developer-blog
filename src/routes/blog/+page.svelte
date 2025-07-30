<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { t } from '$lib/stores/locale';
	import type { BlogPost } from '$lib/types';
	
	let { data } = $props();
	const posts: BlogPost[] = data.posts || [];
	
	// Debug log
	$effect(() => {
		console.log('Blog posts loaded:', posts.length, posts);
	});
	
	// Search and filter state
	let searchQuery = $state('');
	let selectedCategory = $state('');
	let sortOrder = $state('newest');
	
	// Filter and sort posts
	const filteredPosts = $derived.by(() => {
		let filtered = posts;
		
		// Search filter
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(post => 
				post.title.toLowerCase().includes(query) ||
				post.description.toLowerCase().includes(query) ||
				post.tags.some(tag => tag.toLowerCase().includes(query))
			);
		}
		
		// Category filter
		if (selectedCategory) {
			filtered = filtered.filter(post => 
				post.categories.includes(selectedCategory)
			);
		}
		
		// Sort
		const sorted = [...filtered];
		if (sortOrder === 'oldest') {
			sorted.sort((a, b) => a.date.getTime() - b.date.getTime());
		} else {
			sorted.sort((a, b) => b.date.getTime() - a.date.getTime());
		}
		
		return sorted;
	});
	
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
	<title>Blog - {$t('site.title')}</title>
	<meta name="description" content="{$t('site.description')}" />
</svelte:head>

<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="text-center mb-12">
		<h1 class="text-4xl font-bold mb-4">{$t('nav.blog')}</h1>
		<p class="text-lg text-muted max-w-2xl mx-auto">
			{$t('categories.discoverContent')}
		</p>
	</div>

	<!-- Filters -->
	<div class="flex flex-col sm:flex-row gap-4 mb-8">
		<div class="flex-1">
			<div class="relative">
				<Icon name="search" size={20} class="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
				<input
					type="text"
					placeholder="Search posts..."
					bind:value={searchQuery}
					class="w-full pl-10 pr-4 py-2 border border rounded-lg"
				/>
			</div>
		</div>
		
		<div class="flex gap-2">
			<select 
				bind:value={selectedCategory}
				class="px-4 py-2 border border rounded-lg"
			>
				<option value="">{$t('nav.categories')}</option>
				<option value="Backend Development">{$t('categories.backend.name')}</option>
				<option value="Infrastructure & DevOps">{$t('categories.infrastructure.name')}</option>
				<option value="Linux & Systems">{$t('categories.linux.name')}</option>
				<option value="Learning Journey">{$t('categories.learning.name')}</option>
				<option value="Daily Dev Life">{$t('categories.daily.name')}</option>
			</select>
			
			<select 
				bind:value={sortOrder}
				class="px-4 py-2 border border rounded-lg"
			>
				<option value="newest">Newest First</option>
				<option value="oldest">Oldest First</option>
			</select>
		</div>
	</div>

	<!-- Posts Grid -->
	{#if filteredPosts.length > 0}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
			{#each filteredPosts as post}
				<article class="border border rounded-lg overflow-hidden transition-all">
					<!-- Post Image Placeholder -->
					{#if post.coverImage}
						<img src={post.coverImage} alt={post.title} class="w-full aspect-video object-cover" />
					{:else}
						<div class="aspect-video bg-hover flex items-center justify-center">
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
								{#each post.tags.slice(0, 2) as tag}
									<span class="inline-flex items-center px-2 py-1 rounded text-xs border">
										{tag}
									</span>
								{/each}
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
			<h3 class="text-lg font-medium mb-2">{$t('blog.noPostsYet')}</h3>
			<p class="text-muted mb-6">{$t('blog.checkBackSoon')}</p>
		</div>
	{/if}
</div>