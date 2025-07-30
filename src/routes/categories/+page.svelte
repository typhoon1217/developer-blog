<script lang="ts">
	import { categories } from '$lib/config.js';
	import Icon from '$lib/components/Icon.svelte';
	import { t } from '$lib/stores/locale';
</script>

<svelte:head>
	<title>{$t('nav.categories')} - {$t('site.title')}</title>
	<meta name="description" content={$t('categories.discoverContent')} />
</svelte:head>

<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="text-center mb-12">
		<h1 class="text-4xl font-bold mb-4">{$t('nav.categories')}</h1>
		<p class="text-lg text-muted max-w-2xl mx-auto">
			{$t('categories.exploreTopics')}
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each categories as category}
			<a 
				href="/blog/category/{category.slug}"
				class="group block rounded-lg border p-6 transition-all"
			>
				<div class="flex items-center mb-4">
					<div class="p-3 border rounded-lg">
						<Icon name={category.icon} size={28} />
					</div>
					<div class="ml-4">
						<h2 class="text-xl font-semibold">
							{$t(`categories.${category.slug}.name`)}
						</h2>
						<div class="flex items-center text-sm text-muted mt-1">
							<Icon name="book-open" size={14} class="mr-1" />
							<span>0 {$t('categories.posts')}</span>
						</div>
					</div>
				</div>
				
				<p class="text-muted mb-4">
					{$t(`categories.${category.slug}.description`)}
				</p>
				
				<div class="flex items-center text-sm font-medium">
					{$t('categories.browsePosts')}
					<Icon name="arrow-right" size={14} class="ml-1" />
				</div>
			</a>
		{/each}
	</div>

	<!-- Quick Stats -->
	<div class="mt-16 border rounded-lg p-8">
		<h3 class="text-2xl font-bold text-center mb-8">{$t('categories.blogStatistics')}</h3>
		
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
			<div class="text-center">
				<div class="text-3xl font-bold mb-2">0</div>
				<div class="text-sm text-muted">{$t('categories.totalPosts')}</div>
			</div>
			
			<div class="text-center">
				<div class="text-3xl font-bold mb-2">{categories.length}</div>
				<div class="text-sm text-muted">{$t('nav.categories')}</div>
			</div>
			
			<div class="text-center">
				<div class="text-3xl font-bold mb-2">0</div>
				<div class="text-sm text-muted">{$t('categories.tags')}</div>
			</div>
			
			<div class="text-center">
				<div class="text-3xl font-bold mb-2">0</div>
				<div class="text-sm text-muted">{$t('categories.minutesRead')}</div>
			</div>
		</div>
	</div>
</div>