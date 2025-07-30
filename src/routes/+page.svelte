<script lang="ts">
	import { categories } from '$lib/config.js';
	import Icon from '$lib/components/Icon.svelte';
	import { t } from '$lib/stores/locale';
</script>

<svelte:head>
	<title>{$t('site.title')}</title>
	<meta name="description" content={$t('site.description')} />
</svelte:head>

<!-- Hero Section -->
<section class="py-20 px-4 sm:px-6 lg:px-8">
	<div class="max-w-4xl mx-auto text-center">
		<h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
			{$t('hero.welcome')} <span>{$t('site.title')}</span>
		</h1>
		<p class="text-xl text-muted mb-8 max-w-2xl mx-auto">
			{$t('site.description')}
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a 
				href="/blog" 
				class="inline-flex items-center px-6 py-3 button"
			>
				<Icon name="book-open" size={20} class="mr-2" />
				{$t('hero.readBlogPosts')}
			</a>
			<a 
				href="/about" 
				class="inline-flex items-center px-6 py-3 button-secondary"
			>
				<Icon name="user" size={20} class="mr-2" />
				{$t('hero.aboutMe')}
			</a>
		</div>
	</div>
</section>

<!-- Categories Section -->
<section class="py-16 px-4 sm:px-6 lg:px-8 border-t border">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-12">
			<h2 class="text-3xl font-bold mb-4">{$t('categories.exploreTopics')}</h2>
			<p class="text-lg text-muted">{$t('categories.discoverContent')}</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each categories as category}
				<a 
					href="/blog/category/{category.slug}"
					class="group p-6 border border rounded-lg transition-all"
				>
					<div class="flex items-center mb-4">
						<div class="p-2 border border rounded-lg">
							<Icon name={category.icon} size={24} />
						</div>
						<h3 class="ml-3 text-lg font-semibold">
							{$t(`categories.${category.slug}.name`)}
						</h3>
					</div>
					<p class="text-muted">{$t(`categories.${category.slug}.description`)}</p>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Recent Posts Preview -->
<section class="py-16 px-4 sm:px-6 lg:px-8">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-12">
			<h2 class="text-3xl font-bold mb-4">{$t('blog.latestPosts')}</h2>
			<p class="text-lg text-muted">{$t('blog.stayUpToDate')}</p>
		</div>
		
		<!-- Placeholder for recent posts -->
		<div class="text-center py-12">
			<Icon name="book-open" size={48} class="mx-auto text-muted mb-4" />
			<h3 class="text-lg font-medium mb-2">{$t('blog.noPostsYet')}</h3>
			<p class="text-muted mb-6">{$t('blog.checkBackSoon')}</p>
			<a 
				href="/blog" 
				class="inline-flex items-center font-medium hover:underline"
			>
				{$t('blog.viewAllPosts')}
				<Icon name="arrow-right" size={16} class="ml-1" />
			</a>
		</div>
	</div>
</section>